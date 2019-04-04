import * as React from "react";
import Pokemon from "../../common/components/Pokemon";
import styles from "./styles/home.scss"

export default class Home extends React.Component<any, any> {

  public render() {
    return (
      <div className={styles.homeContainer}>
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
