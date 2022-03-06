"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const type_graphql_1 = require("type-graphql");
const apollo_server_1 = require("apollo-server");
const test_1 = require("./resolvers/test");
const apollo_server_core_1 = require("apollo-server-core");
const SignUp_1 = require("./resolvers/SignUp");
require("dotenv/config");
const main = async () => {
    const apolloServer = new apollo_server_1.ApolloServer({
        plugins: [(0, apollo_server_core_1.ApolloServerPluginLandingPageGraphQLPlayground)()],
        schema: await (0, type_graphql_1.buildSchema)({ resolvers: [test_1.TestResolver, SignUp_1.SignUpResolver] }),
    });
    apolloServer.listen(4000);
};
main();
