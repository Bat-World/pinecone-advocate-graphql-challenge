// pages/api/graphql.ts

import { ApolloServer } from '@apollo/server';
import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { typeDefs } from '@/graphql/schemas';
import { resolvers } from '@/graphql/resolvers';
import { connectMongoose } from '@/mongoose/mongoose-connection';

connectMongoose();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,
});

export default startServerAndCreateNextHandler(server);
