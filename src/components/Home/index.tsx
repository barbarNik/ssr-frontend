import * as React from "react";
import { Query } from "react-apollo";
import * as getPokemonsQuery from "../../common/gql/queries/getPokemonsQuery.graphql";
import Home from "./Home";
import { Loader } from "semantic-ui-react";

export default class HomeContainer extends React.Component {
  public render() {
    return (
      <Query query={getPokemonsQuery}>
        {({ loading, data, error }) => {
          if (loading) {
            return <Loader active />;
          }
          if (error) {
            return `Error! ${error.message}`;
          }
          if (data) {
            return <Home pokemons={data.getPokemons} />;
          }
        }}
      </Query>
    );
  }
}
