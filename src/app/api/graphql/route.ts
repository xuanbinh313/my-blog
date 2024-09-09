import { ApolloServer } from '@apollo/server';
import { startServerAndCreateNextHandler } from '@as-integrations/next';
import "reflect-metadata";
import { buildSchema } from 'type-graphql';
import { DogsResolver } from '@/app/shema/dogs.resolver';
import { BlogsResolver } from '@/app/shema/blogs.resolver';

const schema = await buildSchema({
    resolvers: [DogsResolver, BlogsResolver],
  });

// Initialize Apollo Server
const apolloServer = new ApolloServer({ schema });

// Export the Next.js API handler
const handler = startServerAndCreateNextHandler(apolloServer);

export { handler as GET, handler as POST };
