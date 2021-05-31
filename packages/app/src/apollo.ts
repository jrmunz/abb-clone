import { ApolloClient, InMemoryCache } from "@apollo/client";
import { Platform } from "react-native";

// android_host: '10.0.2.2' | ios: 'localhost'
const host = Platform.OS === "ios" ? "localhost" : "10.0.0.2";

export const client = new ApolloClient({
  uri: `http://${host}:4000/graphql`,
  cache: new InMemoryCache(),
});
