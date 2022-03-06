"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const type_graphql_1 = require("type-graphql");
const apollo_server_1 = require("apollo-server");
const apollo_server_core_1 = require("apollo-server-core");
const SignUp_1 = require("./resolvers/SignUp");
const client_1 = require("@prisma/client");
require("dotenv/config");
const main = async () => {
    const prisma = new client_1.PrismaClient();
    const apolloServer = new apollo_server_1.ApolloServer({
        plugins: [(0, apollo_server_core_1.ApolloServerPluginLandingPageGraphQLPlayground)()],
        schema: await (0, type_graphql_1.buildSchema)({ resolvers: [SignUp_1.SignUpResolver] }),
        context: () => ({ prisma }),
    });
    apolloServer.listen(4000);
};
main();
