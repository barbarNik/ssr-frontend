import * as React from "react";
import Pokemon from "../../common/components/Pokemon";
import styles from "./styles/pokedex.scss"

export default class Pokedex extends React.Component<any, any> {

  public render() {
    return (
      <div className={styles.pokedexContainer}>
        {this.props.pokemons
          .map((pokemon: any) =>
            <Pokemon
              key={pokemon.id}
              data={pokemon}
            />)}
      </div>
    );
  }
}
