import { getQueryClient } from "@/app/get-query-client";
import { client } from "@/app/utils/api";
import { ArticleComponent } from "@/components/article-component";
import BackgroundComponent from "@/components/background-component";
import HeroNoImage from "@/components/blocks/hero-no-image";
import { cn } from "@/lib/utils";
import React from "react";

interface BlogPageProps {
  slug: string;
  type: string;
}
export const h1 = cn("prose-h1:text-3xl prose-h1:font-medium");
export const h2 = cn("prose-h2:text-2xl prose-h2:font-medium");
export const h3 = cn("prose-h3:text-lg prose-h3:font-medium");

export const base =
  "prose dark:prose-invert prose-base focus:outline-none max-w-none";
const BlogPage: React.FC<BlogPageProps> = async ({ slug }) => {
  const queryClient = getQueryClient();
  const data = await queryClient.fetchQuery({
    queryKey: ["blog", slug],
    queryFn: async () => (await client.blogBySlug({ slug })).blog,
  });
  if (!data) {
    return <h1>Loading</h1>;
  }
  const content = data.content;
  return (
    <>
      <HeroNoImage {...data} />
      <ArticleComponent className={cn(base, h1, h2, h3)}>
        <BackgroundComponent />
        <div dangerouslySetInnerHTML={{ __html: content }} />
      </ArticleComponent>
    </>
  );
};

export default BlogPage;
