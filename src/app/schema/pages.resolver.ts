import { Resolver, Query, Arg, Mutation } from "type-graphql";

import { InputPage, Page, PageAdmin } from "./pages.schema";
import { db } from "@/db/drizzle";
import { eq, sql } from "drizzle-orm";
import { blocks, heros, pageBlocks, pages } from "@/db/schema";
import { ResponseBase } from "./common.schema";

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
      .where(sql`slug=${slug}`); // slug or id
    if (!page.length) {
      throw new Error("Page not found");
    }
    const { pages: pagesRes, heros: herosRes } = page[0];
    const pageBlocksData = await db
      .select()
      .from(pageBlocks)
      .innerJoin(blocks, eq(pageBlocks.blockId, blocks.id))
      .where(eq(pageBlocks.pageId, pagesRes.id))
      .orderBy(pageBlocks.position);
    return {
      ...pagesRes,
      hero: {
        id: herosRes.id,
        type: herosRes.type,
        image: herosRes.image,
        title: herosRes.title,
        subtitle: herosRes.subtitle,
        content: herosRes.content,
      },
      blocks: pageBlocksData.map(({ blocks }) => ({
        id: blocks.id,
        type: blocks.type,
        title: blocks.title,
        endpoint: blocks.endpoint, // or any other field you want to use
      })),
      createdDate: pagesRes.createdAt,
      updatedDate: pagesRes.updatedAt, // Make sure to add updatedAt field to schema if you need it
      publishedAt: pagesRes.publishedAt, // Make sure to add updatedAt field to schema if you need it
    };
  }

  @Query(() => [Page])
  async getPages(): Promise<PageAdmin[]> {
    const result = await db.execute(sql`
      SELECT id,slug,title,hero_id
      FROM ${pages}`);
    return result.rows as unknown as PageAdmin[]
  }
  
  @Mutation(() => ResponseBase)
  async createPage(
    @Arg("payload") payload: InputPage
  ): Promise<ResponseBase> {
    const result = await db.execute(sql`
      INSERT INTO ${pages} (slug, title, hero_id, published)
      VALUES (${payload.slug}, ${payload.title}, ${payload.heroId}, ${payload.published})
      RETURNING id, slug, title, hero_id
    `);
    const pageId = result.rows[0].id;
    const chunkValues = payload.blocks.map((blockId, index) => `(${pageId+""}, ${blockId+""}, ${index+1})`).join(", ");
    await db.execute(sql`INSERT INTO ${pageBlocks} (page_id, block_id, position) VALUES ${sql.raw(chunkValues)}`);
    return { success: true };
  }

  // @Mutation(() => PageAdmin)
  // async updatePage(
  //   @Arg("slug") slug: string,
  //   @Arg("page") page: PageAdmin
  // ): Promise<PageAdmin> {
  //   // const result = await db.execute(sql`
  //   //   INSERT INTO ${pages} (slug, title, hero_id)
  //   //   VALUES (${page.slug}, ${page.title}, ${page.heroId})
  //   //   RETURNING id, slug, title, hero_id
  //   // `);
  //   // return result.rows[0] as unknown as PageAdmin;
  //   return {} as unknown as PageAdmin;
  // }
}
