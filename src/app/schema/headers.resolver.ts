import { Query, Resolver } from "type-graphql";

import headers from "./headers.json";
import { HeaderItem } from "./headers.schema";

@Resolver(HeaderItem)
export class HeadersResolver {
  @Query(() => [HeaderItem])
  headers(): HeaderItem[] {
    return headers;
  }
}
