import * as React from "react";
import { Query } from "react-apollo";
import { Loader } from "semantic-ui-react";
import * as getAdminPokedexQuery from "../../common/gql/queries/getAdminPokedexQuery.graphql";
import Admin from "./Admin";

export default class AdminContainer extends React.Component {
  public render() {
    return (
      <Query query={getAdminPokedexQuery}>
        {({ loading, data, error }) => {
          if (loading) {
            return <Loader active />;
          }
          if (error) {
            return `Error! ${error.message}`;
          }
          if (data) {
            return <Admin pokemons={data.getAdminPokedex} />;
          }
        }}
      </Query>
    );
  }
}
