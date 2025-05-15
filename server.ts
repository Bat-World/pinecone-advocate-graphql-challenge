// server.ts
import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { typeDefs } from "./graphql/schemas";
import { resolvers } from "./graphql/resolvers";

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
});

export const server = startServerAndCreateNextHandler(apolloServer);
