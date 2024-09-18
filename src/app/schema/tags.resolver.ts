import { Resolver, Query, Arg } from "type-graphql";

import { Tag } from "./tags.schema";
import { techs } from "@/db/schema";
import { db } from "@/db/drizzle";

@Resolver(Tag)
export class TagsResolver {
  @Query(() => Tag, { nullable: true })
  async tag(@Arg("slug", () => String) slug: string): Promise<Tag | undefined> {
    const project = await db.select().from(techs).where({ slug });
    if (!project.length) {
      throw new Error("Page not found");
    }
    return project[0];
  }

  @Query(() => [Tag])
  tags(): Promise<Tag[]> {
    const tagsRes = db.select().from(techs);
    return tagsRes
  }
}
