import * as React from "react";
import { Button, Input, Form, Segment } from "semantic-ui-react";
import styles from "./styles/login.scss";

export default class Login extends React.Component<any, any> {

  // YEAH YEAH it is not react hooks ;P
  constructor(props) {
    super(props);
    this.state = {
      password: "",
      username: "",
    };
    this.setUsername = this.setUsername.bind(this);
    this.setPassword = this.setPassword.bind(this);
    this.signIn = this.signIn.bind(this);
  }

  private setUsername(username) {
    this.setState(prevState => ({ ...prevState, username }));
  }

  private setPassword(password) {
    this.setState(prevState => ({ ...prevState, password }));
  }

  private signIn() {
    const { signIn } = this.props;
    const { username, password } = this.state;
    signIn({
      variables: { username, password },
    });
  }

  public render() {
    const {
      loading,
      error,
    } = this.props;
    return (
      <div className={styles.loginContainer}>
        <Form onSubmit={this.signIn}>
          <Form.Field>
            <label>Username</label>
            <Input
              placeholder="username"
              loading={loading}
              disabled={loading}
              value={this.state.username}
              onChange={e => this.setUsername(e.target.value)}
              error={!!error}
            />
          </Form.Field>
          <Form.Field>
            <label>Password</label>
            <Input
              type="password"
              placeholder="password"
              loading={loading}
              disabled={loading}
              value={this.state.password}
              error={!!error}
              onChange={e => this.setPassword(e.target.value)}
            />
          </Form.Field>
          {error ? (
            <Segment color="red">
              Sign In was unsuccessful
            </Segment>) : null}
          <Button
            type="submit"
            disabled={loading}
          >Submit</Button>
        </Form>
      </div>
    );
  }
}
