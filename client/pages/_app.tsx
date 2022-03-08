import "../styles/globals.css";
import type { AppProps } from "next/app";
import { NextUIProvider } from "@nextui-org/react";
import { SSRProvider } from "@react-aria/ssr";

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  gql,
} from "@apollo/client";
const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
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
