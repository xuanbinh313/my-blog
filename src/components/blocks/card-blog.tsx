import { getQueryClient } from "@/app/get-query-client";
import { client } from "@/app/utils/api";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ChevronRight } from "lucide-react";
import { H3 } from "../ui/typography";
import { Blog } from "@/app/__generated__/resolvers-types";
import { format } from "date-fns";
import Link from "next/link";

export function CardBlog({
  title,
  summary,
  publishedAt,
  slug,
}: Pick<Blog, "title" | "summary" | "publishedAt"|"slug">) {
  return (
    <Card className="w-full border-0 relative p-5">
      <div className="flex justify-between items-center gap-8">
        <div className="flex flex-col gap-4 ">
          <H3>{title}</H3>
          <p className="text-muted-foreground">{summary}</p>
          <div className="flex justify-between text-muted-foreground">
            <div className="text-xs ">
              {publishedAt ? format(Number(publishedAt), "LLL dd, yyyy") : ""}
            </div>
            {/* Mar 15, 2022 */}
            <div className="text-xs ">6 min read</div>
          </div>
        </div>
        <Button asChild variant="destructive" size="icon">
          <Link href={`/blog/${slug}`}>
            <ChevronRight className="text-foreground h-4 w-4" />
          </Link>
        </Button>
      </div>
    </Card>
  );
}

export async function BlogList() {
  const queryClient = getQueryClient();
  const { blogs } = await queryClient.fetchQuery({
    queryKey: ["blogs"],
    queryFn: async () => await client.getBlogs(),
  });
  return blogs.map((blog) => <CardBlog key={blog.slug} {...blog} />);
}
