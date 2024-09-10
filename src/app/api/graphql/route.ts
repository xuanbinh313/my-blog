import { ApolloServer } from '@apollo/server';
import { startServerAndCreateNextHandler } from '@as-integrations/next';
import "reflect-metadata";
import { buildSchema } from 'type-graphql';
import { DogsResolver } from '@/app/schema/dogs.resolver';
import { BlogsResolver } from '@/app/schema/blogs.resolver';
import { HeadersResolver } from '@/app/schema/headers.resolver';

const schema = await buildSchema({
    resolvers: [DogsResolver, BlogsResolver, HeadersResolver],
  });

// Initialize Apollo Server
const apolloServer = new ApolloServer({ schema });

// Export the Next.js API handler
const handler = startServerAndCreateNextHandler(apolloServer);

export { handler as GET, handler as POST };
