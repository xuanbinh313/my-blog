import { Arg, Query, Resolver } from "type-graphql";

import { db } from "@/db/drizzle";
import { blogs, blogTags, techs } from "@/db/schema";
import { eq } from "drizzle-orm";
import { Blog } from "./blogs.schema";

@Resolver(Blog)
export class BlogsResolver {
  @Query(() => Blog, { nullable: true })
  async blog(
    @Arg("slug", () => String) slug: string
  ): Promise<Blog | undefined> {
    const [blogsDB] = await db.select().from(blogs).where(eq(blogs.slug, slug));
    if (!blogsDB) {
      throw new Error("Blog not found");
    }
    const tagsDb = await db
      .select()
      .from(blogTags)
      .innerJoin(techs, eq(blogTags.tagId, techs.id))
      .where(eq(blogTags.blogId, blogsDB.id));
    return { ...blogsDB, tags: tagsDb.map((it) => it.tags), published: "" };
  }

  @Query(() => [Blog])
  async blogs(): Promise<Blog[]> {
    const blogTagsData = await db
      .select()
      .from(blogTags)
      .leftJoin(techs, eq(blogTags.tagId, techs.id))
      .rightJoin(blogs, eq(blogTags.blogId, blogs.id));

    const data = blogTagsData.reduce<Record<number, Blog>>((pre, curr) => {
      const tag = curr.tags;
      const blog = curr.blogs;
      if (!pre[blog.id]) {
        // TODO: fix later published
        pre[blog.id] = { ...blog, tags: tag ? [tag] : [], published: "" };
      }
      if (pre[blog.id] && tag) {
        pre[blog.id].tags.push(tag);
      }
      return pre;
    }, {});
    return Object.values(data);
  }
}
