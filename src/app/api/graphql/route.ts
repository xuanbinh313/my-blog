import { logger } from "./../../../lib/logger";
import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import "reflect-metadata";
import { buildSchema } from "type-graphql";
import { DogsResolver } from "@/app/schema/dogs.resolver";
import { BlogsResolver } from "@/app/schema/blogs.resolver";
import { HeadersResolver } from "@/app/schema/headers.resolver";
import { PagesResolver } from "@/app/schema/pages.resolver";
import { ProjectsResolver } from "@/app/schema/projects.resolver";
import { TagsResolver } from "@/app/schema/tags.resolver";

const schema = await buildSchema({
  resolvers: [
    DogsResolver,
    BlogsResolver,
    HeadersResolver,
    PagesResolver,
    ProjectsResolver,
    TagsResolver,
  ],
});

// Initialize Apollo Server
const apolloServer = new ApolloServer({
  schema,

  plugins: [
    {
      // Apollo Server plugin for logging GraphQL requests and responses
      async requestDidStart(requestContext) {
        // Log incoming request
        // logger.info(
        //   `Received GraphQL request: ${requestContext.request.operationName}`
        // );
        // logger.info(`GraphQL Query: ${requestContext.request.query}`);
        // if (requestContext.request.variables) {
        //   logger.info(
        //     `Variables: ${JSON.stringify(requestContext.request.variables)}`
        //   );
        // }
        return {
          async willSendResponse(responseContext) {
            // Log the response
            if (responseContext.errors) {
              logger.error(
                `GraphQL Errors: ${JSON.stringify(responseContext.errors)}`
              );
            }

            // else {
            //   logger.info(
            //     `GraphQL Response: ${JSON.stringify(
            //       responseContext.response.body
            //     )}`
            //   );
            // }
          },
        };
      },
    },
  ],
});

// Export the Next.js API handler
const handler = startServerAndCreateNextHandler(apolloServer);

export { handler as GET, handler as POST };
