import { Resolver, Query, Arg } from "type-graphql";

import { Page, PageAdmin } from "./pages.schema";
import { db } from "@/db/drizzle";
import { eq, sql } from "drizzle-orm";
import { blocks, heros, pageBlocks, pages } from "@/db/schema";

@Resolver(Page)
export class PagesResolver {
  @Query(() => Page, { nullable: true })
  async page(
    @Arg("slug", () => String) slug: string
  ): Promise<Page | undefined> {
    const page = await db
      .select()
      .from(pages)
      .innerJoin(heros, eq(pages.hero, heros.id))
      .where(eq(pages.slug, slug));
    if (!page.length) {
      throw new Error("Page not found");
    }
    const { pages: pagesRes, heros: herosRes } = page[0];
    // const page = pagesData.find((page) => page.published && page.slug === slug);
    const pageBlocksData = await db
      .select()
      .from(pageBlocks)
      .innerJoin(blocks, eq(pageBlocks.blockId, blocks.id))
      .where(eq(pageBlocks.pageId, pagesRes.id))
      .orderBy(pageBlocks.position);

    return {
      ...pagesRes,
      hero: {
        type: herosRes.type,
        image: herosRes.image,
        title: herosRes.title,
        subtitle: herosRes.subtitle,
        content: herosRes.content,
      },
      blocks: pageBlocksData.map(({ blocks }) => ({
        type: blocks.type,
        name: blocks.title,
        value: blocks.endpoint, // or any other field you want to use
      })),
      createdDate: pagesRes.createdAt,
      updatedDate: pagesRes.updatedAt, // Make sure to add updatedAt field to schema if you need it
    };
  }

  @Query(() => [Page])
  async getPages(): Promise<PageAdmin[]> {
    const result = await db.execute(sql`
      SELECT id,slug,title 
      FROM ${pages}`);
    console.log(result);
    
    return result.rows as unknown as PageAdmin[]
  }
}
