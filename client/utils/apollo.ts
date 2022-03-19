import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import Cookies from "js-cookie";

const link = new HttpLink({
  uri: "/graphql", // gets proxied to the backend
  credentials: "include",
});
export const client = new ApolloClient({
  cache: new InMemoryCache(),
  link,
});
