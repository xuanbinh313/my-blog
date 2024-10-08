"use client";
import { GetBlogsQuery } from "@/app/__generated__/resolvers-types";
import { client } from "@/app/utils/api";
import { useSuspenseQuery } from "@tanstack/react-query";
import { columns } from "./columns";
import { DataTable } from "@/components/data-table/data-table";

export default function BlogsAdmin() {
  const { data } = useSuspenseQuery({
    queryKey: ["blogs", "admin"],
    queryFn: async () => (await client.getBlogsAdmin()).blogsAdmin,
  });
  return (
    <DataTable<GetBlogsQuery["blogs"][number], unknown>
      data={data}
      columns={columns}
    />
  );
}
