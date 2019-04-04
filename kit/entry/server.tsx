// Server entrypoint

// ----------------------------------------------------------------------------
// IMPORTS

/* NPM */
import "cross-fetch/polyfill";

import * as React from "react";
import { ApolloProvider, getDataFromTree } from "react-apollo";

// React utility to transform JSX to HTML (to send back to the client)
import * as ReactDOMServer from "react-dom/server";

// <Helmet> component for retrieving <head> section, so we can set page
// title, meta info, etc along with the initial HTML
import Helmet from "react-helmet";

import { StaticRouter } from "react-router";
import { ServerStyleSheet, StyleSheetManager } from "styled-components";
import { CookiesProvider } from "react-cookie";
/* Local */
import Root from "../../src/components/root";
import { createClient } from "../lib/apollo";
import Output from "../lib/output";
import { ThemeProvider } from "../lib/styledComponents";
import defaultTheme from "../themes/default";
import Html from "../views/ssr";

// ----------------------------------------------------------------------------

// Types
export interface IRouterContext {
  status?: number;
  url?: string;
}

export default function (output: Output) {
  // Create Koa middleware to handle React requests
  return async (ctx: any) => {
    // Create a new Apollo client
    const client = createClient(ctx.request.universalCookies);

    // Create a new styled-components instance
    const sheet = new ServerStyleSheet();

    // Create a fresh 'context' for React Router
    const routerContext: IRouterContext = {};

    const components = (
      <StyleSheetManager sheet={sheet.instance}>
        <ThemeProvider theme={defaultTheme}>
          <ApolloProvider client={client}>
            <StaticRouter
              location={ctx.request.url}
              context={routerContext}
            >
              <CookiesProvider cookies={ctx.request.universalCookies}>
                <Root />
              </CookiesProvider>
            </StaticRouter>
          </ApolloProvider>
        </ThemeProvider>
      </StyleSheetManager>
    );

    // Render the Apollo tree
    await getDataFromTree(components);

    // Handle redirects
    if ([301, 302].includes(routerContext.status!)) {
      // 301 = permanent redirect, 302 = temporary
      ctx.status = routerContext.status!;

      // Issue the new `Location:` header
      ctx.redirect(routerContext.url!);

      // Return early -- no need to set a response body
      return;
    }

    // Handle 404 Not Found
    if (routerContext.status === 404) {
      // By default, just set the status code to 404. You can
      // modify this section to do things like log errors to a
      // third-party, or redirect users to a dedicated 404 page

      ctx.status = 404;
      ctx.body = "Not found";

      return;
    }

    // Create response HTML
    const html = ReactDOMServer.renderToString(components);

    // Create the React render via React Helmet
    const reactRender = ReactDOMServer.renderToString(
      <Html
        css={output.client.main("css")!}
        helmet={Helmet.renderStatic()}
        html={html}
        js={output.client.main("js")!}
        styles={sheet.getStyleElement()}
        window={{
          __APOLLO_STATE__: client.extract(),
        }}
        environmentVariables={{
          ENV_FLAVOR: process.env.ENV_FLAVOR,
        }}
      />,
    );

    // Set the return type to `text/html`, and stream the response back to
    // the client
    ctx.type = "text/html";
    ctx.body = `<!DOCTYPE html>${reactRender}`;
  };
}
