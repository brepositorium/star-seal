import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "https://base.easscan.org/graphql",
  cache: new InMemoryCache(),
});

export default client;
