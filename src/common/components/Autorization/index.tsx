import * as React from "react";
import { graphql, withApollo, compose } from "react-apollo";
import base64 from "base-64";
import { withCookies } from "react-cookie";
import { withRouter, Redirect } from "react-router";
import * as currentUserQuery from "../../../common/gql/queries/currentUserQuery.graphql";

const TOKEN_COOKIE_NAME = "token";
export const withUser = Component => {
  class WithUserHOC extends React.Component<any, any> {
    public getUserRole = () => {
      const {
        isAuthorized,
        cookies,
      } = this.props;
      if (isAuthorized) {
        const authCookie = cookies.get(TOKEN_COOKIE_NAME);
        if (authCookie) {
          try {
            const payload = JSON.parse(base64.decode(authCookie.split(".")[1]));
            return payload.userRole;
          } catch (e) {
            console.warn("Unable to decode current user role", e);
          }
        }
      }
      return undefined;
    };

    public signOut = async () => {
      const {
        isAuthorized,
        cookies,
        client,
        currentUser,
      } = this.props;
      if (currentUser || isAuthorized) {
        cookies.remove(TOKEN_COOKIE_NAME, { maxAge: 172000, path: "/" });
        await client.resetStore();
      }
    };

    public signIn = async authToken => {
      const {
        cookies,
        history,
        client,
        isAuthorized,
      } = this.props;

      if (authToken && !isAuthorized) {
        cookies.set(TOKEN_COOKIE_NAME, authToken, { maxAge: 172000, path: "/" });
        history.push("/");
        await client.resetStore();
      }
    };

    public authorizationPanic = () => {
      this.props.history.push("/signin", { from: this.props.location });
    };

    public render() {
      return (
        <Component
          {...this.props}
          signOut={this.signOut}
          signIn={this.signIn}
          authorizationPanic={this.authorizationPanic}
          userRole={this.getUserRole()}
        />
      );
    }
  }

  const apolloWrapper = graphql(currentUserQuery, {
    options: {
      errorPolicy: "ignore",
      notifyOnNetworkStatusChange: true,
    },
    props({ data, ownProps: { cookies } }: any) {
      const { loading, currentUser } = data;
      return {
        currentUser,
        isAuthorized: !!cookies.get(TOKEN_COOKIE_NAME), // optimistic Authorization,
        isUserLoading: loading,
      };
    },
  });
  return compose(
    withCookies,
    withRouter,
    withApollo,
    apolloWrapper,
  )(WithUserHOC);
};

export const withAuthorization = (Component, allowedRoles) => {
  class WithAuthorizationHOC extends React.Component<any, any> {
    render() {
      const { isAuthorized, location, userRole } = this.props;
      if (isAuthorized) {
        if (allowedRoles.indexOf && allowedRoles.indexOf(userRole) > -1) {
          return <Component {...this.props} />;
        }
        return <Redirect to={{ pathname: "/" }} />;
      }
      return <Redirect to={{ pathname: "/login", state: { from: location } }} />;
    }
  }

  return withUser(WithAuthorizationHOC);
};

export const withoutAuthorization = Component => {
  class WithoutAuthorizationHOC extends React.Component<any, any> {

    public render() {
      const { isAuthorized } = this.props;
      return (
        !isAuthorized ?
          <Component {...this.props} /> :
          <Redirect to="/" />
      );
    }
  }

  return withUser(WithoutAuthorizationHOC);
};

export const RenderFor = withUser(props => {
  const { allowedRoles = [], isAuthorized, userRole, children } = props;
  if (isAuthorized) {
    if (allowedRoles.indexOf && allowedRoles.indexOf(userRole) > -1) {
      return children;
    }
  }
  return null;
});
