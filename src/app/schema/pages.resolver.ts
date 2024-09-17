import { Resolver, Query, Arg } from "type-graphql";

import pages from "./pages.json";
import { Page } from "./pages.schema";
import { db } from "@/db/drizzle";

@Resolver(Page)
export class PagesResolver {
  @Query(() => Page, { nullable: true })
  page(@Arg("slug", () => String) slug: string): Page | undefined {
    const page = pages.find((page) => page.published && page.slug === slug);
    if (page === undefined) {
      throw new Error("Page not found");
    }
    return page;
  }

  @Query(() => [Page])
  pages(): Page[] {
    return pages;
  }
}
