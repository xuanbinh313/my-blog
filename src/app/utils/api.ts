import { GraphQLClient } from "graphql-request";

import { QueryClient } from "@tanstack/react-query";
import { getSdk } from "../__generated__/resolvers-types";

const gqlClient = new GraphQLClient("http://localhost:3000/api/graphql");
export const { getDogs, dogByName } = getSdk(gqlClient);

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    },
  },
});