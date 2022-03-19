import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import Cookies from "js-cookie";

const link = new HttpLink({
  uri: "/graphql",
  // process.env.NODE_ENV === "production"
  //   ? "https://sections-be.herokuapp.com/graphql"
  //   : "http://localhost:4000/graphql",
  credentials: "include",
  // headers: {},
});
export const client = new ApolloClient({
  // uri:
  //   process.env.NODE_ENV === "production"
  //     ? "https://sections-be.herokuapp.com/graphql"
  //     : "http://localhost:4000/graphql",
  cache: new InMemoryCache(),
  link,
  // credentials: "include",

  // headers: {
  //   "Access-Control-Allow-Credentials": "true",
  //   withCredentials: "true",
  //   mode: "cors",
  //   credentials: "include",
  // },
});
