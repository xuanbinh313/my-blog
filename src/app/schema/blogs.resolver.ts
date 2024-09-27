import { Arg, Mutation, Query, Resolver } from "type-graphql";

import { db } from "@/db/drizzle";
import { blogs, blogTags, techs } from "@/db/schema";
import { eq, sql } from "drizzle-orm";
import { Blog, InputBlog } from "./blogs.schema";
import { ResponseBase } from "./common.schema";

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
    return { ...blogsDB, tags: tagsDb.map((it) => it.tags) };
  }

  @Query(() => [Blog])
  async blogs(): Promise<Blog[]> {
    const blogTagsData = await db
      .select()
      .from(blogTags)
      .leftJoin(techs, eq(blogTags.tagId, techs.id))
      .rightJoin(blogs, eq(blogTags.blogId, blogs.id)).where(eq(blogs.published, true));

    const data = blogTagsData.reduce<Record<number, Blog>>((pre, curr) => {
      const tag = curr.tags;
      const blog = curr.blogs;
      if (!pre[blog.id]) {
        pre[blog.id] = { ...blog, tags: tag ? [tag] : [] };
      }
      if (pre[blog.id] && tag) {
        pre[blog.id].tags.push(tag);
      }
      return pre;
    }, {});
    return Object.values(data);
  }
  @Query(() => [Blog])
  async blogsAdmin(): Promise<Blog[]> {
    const blogTagsData = await db
      .select()
      .from(blogTags)
      .leftJoin(techs, eq(blogTags.tagId, techs.id))
      .rightJoin(blogs, eq(blogTags.blogId, blogs.id));

    const data = blogTagsData.reduce<Record<number, Blog>>((pre, curr) => {
      const tag = curr.tags;
      const blog = curr.blogs;
      if (!pre[blog.id]) {
        pre[blog.id] = { ...blog, tags: tag ? [tag] : [] };
      }
      if (pre[blog.id] && tag) {
        pre[blog.id].tags.push(tag);
      }
      return pre;
    }, {});
    return Object.values(data);
  }
  @Mutation(() => Blog)
  async createBlog(@Arg("blog") blog: InputBlog): Promise<Blog> {
    const result = await db
      .insert(blogs)
      .values(blog)
      .returning({ id: blogs.id });
    return result[0] as Blog;
  }

  @Mutation(() => ResponseBase)
  async updateBlog(
    @Arg("slug") slug: string,
    @Arg("blog") blog: InputBlog
  ): Promise<ResponseBase> {
    const [blogsDB] = await db.select().from(blogs).where(eq(blogs.slug, slug));
    if (!blogsDB) {
      throw new Error("Blog not found");
    }
    // Step 1: Get existing tag associations for the blog
    const existingTags = await db
      .select()
      .from(blogTags)
      .where(eq(blogTags.blogId, blogsDB.id));
    // Step 2: Filter out existing tagIds
    const existingTagIds = existingTags.map((tag) => tag.tagId);
    const newTagsToInsert = blog.tags.filter(
      (tagId) => !existingTagIds.includes(tagId)
    );

    // Step 3: Insert new tags only
    if (newTagsToInsert.length > 0) {
      await db
        .insert(blogTags)
        .values(
          newTagsToInsert.map((tagId) => ({ blogId: blogsDB.id, tagId }))
        );
    }
    await db.execute(
      sql`DELETE FROM ${blogTags} WHERE ${blogTags.blogId} = ${sql.raw(
        blogsDB.id.toString()
      )} AND ${blogTags.tagId} NOT IN (${sql.raw(blog.tags.join(","))})`
    );
    const result = blog.published
      ? { ...blog, publishedAt: sql`now()` }
      : blog;
     await db.update(blogs).set(result).where(eq(blogs.slug, slug)).returning()
    return { success: true };
  }
}
