import { Resolver, Query, Arg, ID } from "type-graphql";

import { Tag } from "./tags.schema";
import { techs } from "@/db/schema";
import { db } from "@/db/drizzle";
import { sql } from "drizzle-orm";

@Resolver(Tag)
export class TagsResolver {
  @Query(() => Tag, { nullable: true })
  async tag(@Arg("id", () => ID) id: number): Promise<Tag | undefined> {
    const query = sql`
      SELECT ${techs.id},${techs.slug},${techs.title},${techs.image},${techs.content} 
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
}
