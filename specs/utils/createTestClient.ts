// specs/utils/createTestClient.ts
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { typeDefs } from "@/graphql/schemas";
import { resolvers } from "@/graphql/resolvers";
import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";

let mongod: MongoMemoryServer;
let serverUrl: string;

export const createTestClient = async () => {
  mongod = await MongoMemoryServer.create();
  const uri = mongod.getUri();

  await mongoose.connect(uri);

  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

 const { url } = await startStandaloneServer(server, {
  listen: { port: 0 }, 
});

  serverUrl = url;

  return {
    executeOperation: async ({ query, variables = {} }: { query: any, variables?: any }) => {
      const response = await fetch(serverUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: query.loc?.source.body,
          variables,
        }),
      });
      return response.json();
    }
  };
};

export const stopTestClient = async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  if (mongod) await mongod.stop();
};