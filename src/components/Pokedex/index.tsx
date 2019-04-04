import * as React from "react";
import { Query } from "react-apollo";
import * as getPokedexQuery from "../../common/gql/queries/getPokedexQuery.graphql";
import Pokedex from "./Pokedex";
import { Loader } from "semantic-ui-react";

export default class PokedexContainer extends React.Component {
  public render() {
    return (
      <Query query={getPokedexQuery}>
        {({ loading, data, error }) => {
          if (loading) {
            return <Loader active />;
          }
          if (error) {
            return `Error! ${error.message}`;
          }
          if (data) {
            return <Pokedex pokemons={data.getPokedex} />;
          }
        }}
      </Query>
    );
  }
}
