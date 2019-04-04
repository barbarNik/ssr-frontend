import * as React from "react";
import { Mutation, compose } from "react-apollo";
import { withUser } from "@/common/components/Autorization";
import * as signInMutation from "@/common/gql/mutations/signInMutation.graphql";
import Login from "./Login";

class LoginContainer extends React.Component<any, any> {

  private onLoginComplete = (data: any) => {
    this.props.signIn(data.SignIn.jwt);
  };

  public render() {
    return (
      <Mutation
        mutation={signInMutation}
        onCompleted={this.onLoginComplete}
      >
        {(signIn, { loading, error }) => {
          return (
            <Login
              signIn={signIn}
              loading={loading}
              error={error}
            />
          );
        }}
      </Mutation>
    );
  }
}

export default compose(withUser)(LoginContainer);
