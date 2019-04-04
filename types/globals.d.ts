import { DocumentNode } from "graphql";

declare var GRAPHQL: string;
declare var SERVER: boolean;
declare var WS_SUBSCRIPTIONS: boolean;
declare module "*.graphql" {
  import {DocumentNode} from "graphql";

  const value: DocumentNode;
  export = value;
}
declare module "*.scss" {
  const content: {[className: string]: string};
  export = content;
}