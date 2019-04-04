import * as React from "react";
import { Header, Table } from "semantic-ui-react";

import styles from "./styles/index.scss";

export default class Pokemon extends React.Component<any, any> {

  public render() {
    const {
      image,
      name,
      types,
      weight,
      height,
    } = this.props.data;
    return (
      <div className={styles.pokemonContainer}>
        <div className={styles.imgContainer}>
          <img src={image} />
        </div>
        <div className={styles.tableContainer}>
          <Table
            basic="very"
            celled
            collapsing
          >
            <Table.Body>
              <Table.Row>
                <Table.Cell>
                  <Header
                    as="h4"
                    image
                  >
                    <Header.Content>
                      Name
                    </Header.Content>
                  </Header>
                </Table.Cell>
                <Table.Cell>{name}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>
                  <Header
                    as="h4"
                    image
                  >
                    <Header.Content>
                      Types
                    </Header.Content>
                  </Header>
                </Table.Cell>
                <Table.Cell>{types.join(", ")}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>
                  <Header
                    as="h4"
                    image
                  >
                    <Header.Content>
                      Weight
                    </Header.Content>
                  </Header>
                </Table.Cell>
                <Table.Cell>{weight.maximum}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>
                  <Header
                    as="h4"
                    image
                  >
                    <Header.Content>
                      Height
                    </Header.Content>
                  </Header>
                </Table.Cell>
                <Table.Cell>{height.maximum}</Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
        </div>
      </div>
    );
  }
}