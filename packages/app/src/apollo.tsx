import { ApolloClient, InMemoryCache } from "@apollo/client";
import { NativeModules } from "react-native";

const protocol_host = NativeModules.SourceCode.scriptURL.split(":").slice(0, 2).join(":");

export const client = new ApolloClient({
  uri: `${protocol_host}:4000/graphql`,
  cache: new InMemoryCache(),
});
