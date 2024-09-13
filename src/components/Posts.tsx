"use client";
import { client } from "@/app/utils/api";
import { useQuery, useSuspenseQuery } from "@tanstack/react-query";

const Posts = () => {
  const { data } = useQuery({
    queryKey: ["dogs"],
    queryFn: async () => await client.getBlogs(),
  });
  return data?.blogs?.map((item) => <p key={item.slug}>{item.title}</p>);
};
export default Posts;
