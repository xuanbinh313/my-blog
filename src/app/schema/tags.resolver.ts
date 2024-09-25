import { Resolver, Query, Arg, ID, Mutation } from "type-graphql";

import { InputTag, Tag } from "./tags.schema";
import { techs } from "@/db/schema";
import { db } from "@/db/drizzle";
import { eq, sql } from "drizzle-orm";

@Resolver(Tag)
export class TagsResolver {
  @Query(() => Tag, { nullable: true })
  async tag(@Arg("id", () => ID) id: number): Promise<Tag | undefined> {
    const query = sql`
      SELECT ${techs.id},${techs.link},${techs.slug},${techs.title},${techs.image},${techs.content} 
      FROM ${techs} 
      WHERE id = ${id}
    `;
    const project = await db.execute(query);
    if (project.rowCount === 0) {
      throw new Error("Page not found");
    }
    const tag = project.rows[0] as unknown as Tag;
    return tag;
  }

  @Query(() => [Tag])
  async tags(): Promise<Tag[]> {
    const tagsRes = await db.select().from(techs);
    return tagsRes;
  }

  @Mutation(() => Tag)
  async createTag(
    @Arg("id", () => ID) id: number,
    @Arg("payload") tag: InputTag
  ): Promise<Tag> {
    console.log("id", id);
    let init = { id: 0, slug: '', title: '', content: '', image: '', link: '' }; 
    let result =  null
    if (!id) {
      result = await db.execute(sql`INSERT INTO ${techs} ${tag} RETURNING *`);
    } else{
      await db
        .update(techs)
        .set({
          image: tag.image,
          slug: tag.slug,
          title: tag.title,
          content: tag.content,
          link: tag.link,
        })
        .where(eq(techs.id, id));
    }
    return result ? result.rows[0] as unknown as Tag : init;
  }
}
