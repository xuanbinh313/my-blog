import { Arg, ID, Mutation, Query, Resolver } from "type-graphql";

import { db } from "@/db/drizzle";
import { techs } from "@/db/schema";
import { sql } from "drizzle-orm";
import { InputTag, ResponseTag, Tag } from "./tags.schema";

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
  async getTags(): Promise<Tag[]> {
    const tagsRes = await db.select().from(techs);
    return tagsRes;
  }

  @Mutation(() => ResponseTag)
  async updateTag(
    @Arg("id", () => ID) id: number,
    @Arg("payload") tag: InputTag
  ): Promise<ResponseTag> {
    const result = await db.execute(sql`
      UPDATE ${techs} 
      SET title=${tag.title}, slug=${tag.slug}, content=${tag.content}, link=${tag.link}, image=${tag.image} 
      WHERE id = ${id}`);
    if (result.rowCount === 0) 
      throw new Error("Tag update failed");
    return { success: true };
  }

  @Mutation(() => ResponseTag)
  async createTag(
    @Arg("payload") tag: InputTag
  ): Promise<ResponseTag> {
    const result = await db.execute(
      sql`INSERT INTO ${techs} (title, slug, content, link, image) VALUES(${tag.title}, ${tag.slug}, ${tag.content}, ${tag.link}, ${tag.image})`
    );
    if (result.rowCount === 0) 
      throw new Error("Tag cannot create");
    return { success: true };
  }
}
