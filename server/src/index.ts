import "reflect-metadata";
import { buildSchema } from "type-graphql";
import { ApolloServer, gql } from "apollo-server";
import { TestResolver } from "./resolvers/test";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";

const main = async () => {
  const apolloServer = new ApolloServer({
    plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
    schema: await buildSchema({ resolvers: [TestResolver] }),
  });
  apolloServer.listen(4000);
};

main();
