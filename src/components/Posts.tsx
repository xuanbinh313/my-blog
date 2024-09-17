"use client";
import { client } from "@/app/utils/api";
import { useSuspenseQuery } from "@tanstack/react-query";

const Posts = () => {
  const { data } = useSuspenseQuery({
    queryKey: ["dogs"],
    queryFn: async () => await client.getBlogs(),
  });
  return data?.blogs?.map((item) => <p key={item.slug}>{item.title}</p>);
};
export default Posts;
