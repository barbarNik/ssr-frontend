// Root entry point

// ----------------------------------------------------------------------------
// IMPORTS

/* NPM */
import * as React from "react";
import Helmet from "react-helmet";
import { hot } from "react-hot-loader";
import { Switch } from "react-router-dom";
import { withoutAuthorization, withAuthorization } from "@/common/components/Autorization";
import MenuLayout from "../common/components/layouts/MenuLayout";
import Home from "./Home";
import Login from "./Login";
import Pokedex from "./Pokedex";
import Admin from "./Admin";

/* Local */

// Components
import ScrollTop from "../common/components/helpers/scrollTop";

// Global styles
import { GlobalStyles } from "../common/styles/styles";

// ----------------------------------------------------------------------------
const noAuthLogin = withoutAuthorization(Login);
const authPokedex = withAuthorization(Pokedex, ["USER"]);
const authAdmin = withAuthorization(Admin, ["ADMIN"]);

const Root = () => (
  <div>
    <GlobalStyles />
    <Helmet>
      <title>ReactQL starter kit - edit me!</title>
    </Helmet>
    <ScrollTop>
      <Switch>
        <MenuLayout
          path="/"
          exact
          component={Home}
        />
        <MenuLayout
          path="/pokedex"
          exact
          component={authPokedex}
        />
        <MenuLayout
          path="/login"
          exact
          component={noAuthLogin}
        />
        <MenuLayout
          path="/admin"
          exact
          component={authAdmin}
        />
      </Switch>
    </ScrollTop>
  </div>
);

export default hot(module)(Root);
