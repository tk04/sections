import "reflect-metadata";
import { buildSchema } from "type-graphql";
import express from "express";
import { ApolloServer, gql } from "apollo-server-express";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import { SignUpResolver } from "./resolvers/SignUp";
import { PrismaClient } from "@prisma/client";
import "dotenv/config";
import cookieParser from "cookie-parser";
import cors from "cors";
import { TweetResolver } from "./resolvers/Tweet";
const main = async () => {
  const app = express();
  app.use(cookieParser(process.env.JWT_SECRET));
  app.use(cors({ origin: "http://localhost:3000", credentials: true }));
  const prisma = new PrismaClient();
  const apolloServer = new ApolloServer({
    plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
    schema: await buildSchema({ resolvers: [SignUpResolver, TweetResolver] }),
    context: ({ req, res }) => ({ req, res, prisma }),
  });
  await apolloServer.start();
  apolloServer.applyMiddleware({
    app,
    cors: { origin: "http://localhost:3000", credentials: true },
  });
  app.listen(4000);
};

main();
