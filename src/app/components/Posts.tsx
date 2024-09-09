'use client'
import { useSuspenseQuery } from "@tanstack/react-query";
import { getDogs } from "../utils/api";

const Posts = () => {
  const { data } = useSuspenseQuery({
    queryKey: ["dogs"],
    queryFn: async () => await getDogs(),
  });
  console.log(data);
  return data.dogs.map((item: { name: string }) => <p>{item.name}</p>);
};
export default Posts;
