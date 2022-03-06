import "reflect-metadata";
import { buildSchema } from "type-graphql";
import { ApolloServer, gql } from "apollo-server";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import { SignUpResolver } from "./resolvers/SignUp";
import { PrismaClient } from "@prisma/client";
import "dotenv/config";

const main = async () => {
  const prisma = new PrismaClient();
  const apolloServer = new ApolloServer({
    plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
    schema: await buildSchema({ resolvers: [SignUpResolver] }),
    context: () => ({ prisma }),
  });
  apolloServer.listen(4000);
};

main();
