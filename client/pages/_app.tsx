import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { NextUIProvider } from "@nextui-org/react";
import type { AppProps } from "next/app";
import "../styles/globals.css";

const client = new ApolloClient({
  uri:
    process.env.NODE_ENV === "production"
      ? "https://sections-be.herokuapp.com/graphql"
      : "http://localhost:4000/graphql",
  cache: new InMemoryCache(),
  credentials: "include",
});
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      {/* <SSRProvider> */}
      <NextUIProvider>
        <Component {...pageProps} />
      </NextUIProvider>
      {/* </SSRProvider> */}
    </ApolloProvider>
  );
}

export default MyApp;
