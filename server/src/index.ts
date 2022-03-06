import "reflect-metadata";
import { buildSchema } from "type-graphql";
import { ApolloServer, gql } from "apollo-server";
import { TestResolver } from "./resolvers/test";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import { SignUpResolver } from "./resolvers/SignUp";
import "dotenv/config";
const main = async () => {
  const apolloServer = new ApolloServer({
    plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
    schema: await buildSchema({ resolvers: [TestResolver, SignUpResolver] }),
  });
  apolloServer.listen(4000);
};

main();
