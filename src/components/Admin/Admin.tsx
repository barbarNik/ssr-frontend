import * as React from "react";
import Pokemon from "../../common/components/Pokemon";
import styles from "./styles/admin.scss"

export default class Admin extends React.Component<any, any> {

  public render() {
    return (
      <div>
        <div style={{ textAlign: "center" }}>
          <h2>Admin Zone</h2>
        </div>
        <div className={styles.adminPokedexContainer}>
          {this.props.pokemons
            .map((pokemon: any) =>
              <Pokemon
                key={pokemon.id}
                data={pokemon}
              />)}
        </div>
      </div>
    );
  }
}
