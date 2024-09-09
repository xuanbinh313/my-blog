import { Resolver, Query, Arg } from "type-graphql";

import blogs from "./blogs.json";
import { Blog } from "./blogs.schema";

@Resolver(Blog)
export class BlogsResolver {
  @Query(() => Blog, { nullable: true })
  blog(@Arg("slug", () => String) slug: string): Blog | undefined {
    const blog = blogs.find((blog) => blog.slug === slug);
    if (blog === undefined) {
      throw new Error("Blog not found");
    }
    return blog;
  }

  @Query(() => [Blog])
  blogs(): Blog[] {
    return blogs;
  }
}
