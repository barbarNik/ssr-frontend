import * as React from "react";
import { Link, Route } from "react-router-dom";
import { Menu, Dropdown, Loader } from "semantic-ui-react";
import * as safeGet from "lodash.get";
import { withUser, RenderFor } from "@/common/components/Autorization";
import constants from "@/common/constants";

import styles from "./styles/index.scss";

// Sorry  for inline-if-hell ;(
const MenuLayout = ({ component: Component, isAuthorized, currentUser, signOut, userRole, ...rest }) => (
  <Route
    {...rest}
    render={matchProps => (

      <div>
        <Menu className={styles.menuContainer}>
          <Menu.Item>
            <Link to="/">All Pokemons</Link>
          </Menu.Item>
          {isAuthorized ? (
              currentUser ? (
                <Dropdown
                  floating
                  item
                  className={styles.dropDown}
                  text={
                    <div className={styles.userContainer}>
                      <img src={safeGet(currentUser, "avatar")} />
                      <div>{`${safeGet(currentUser, "name")} ${safeGet(currentUser, "surname")}`}</div>
                    </div>
                  }
                  pointing
                >
                  <Dropdown.Menu>
                    <RenderFor allowedRoles={["USER"]}>
                      <Dropdown.Item
                        as={Link}
                        to="/pokedex"
                      >
                        My Pokedex
                      </Dropdown.Item>
                    </RenderFor>
                    <RenderFor allowedRoles={["ADMIN"]}>
                      <Dropdown.Item
                        as={Link}
                        to="/admin"
                      >
                        Admin Panel
                      </Dropdown.Item>
                    </RenderFor>
                    <Dropdown.Item onClick={signOut}>
                      SignOut
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              ) : (
                <Menu.Item className={styles.loader}>
                  <Loader active />
                </Menu.Item>
              )
            ) :
            (
              <Menu.Item>
                <Link to="/login">Login</Link>
              </Menu.Item>
            )}
          <Menu.Item>
            Environment: {constants.ENV_FLAVOR}
          </Menu.Item>
        </Menu>
        <div>
          <Component {...matchProps} />
        </div>
      </div>
    )}
  />);

export default withUser(MenuLayout);
