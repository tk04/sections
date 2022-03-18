import { ApolloClient, InMemoryCache } from "@apollo/client";
import Cookies from "js-cookie";

export const client = new ApolloClient({
  uri:
    process.env.NODE_ENV === "production"
      ? "https://sections-be.herokuapp.com/graphql"
      : "http://localhost:4000/graphql",
  cache: new InMemoryCache(),
  credentials: "include",
  headers: {
    cookie: Cookies.get("token") || "",
    crossDomain: "true",
  },
});
