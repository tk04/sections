import { ApolloProvider } from "@apollo/client";
import { NextUIProvider } from "@nextui-org/react";
import type { AppProps } from "next/app";
import "../styles/globals.css";
import { client } from "../utils/apollo";
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
