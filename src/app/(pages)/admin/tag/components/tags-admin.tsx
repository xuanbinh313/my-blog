"use client";
import { GetTagsQuery } from "@/app/__generated__/resolvers-types";
import { client } from "@/app/utils/api";
import { DataTable } from "@/components/data-table/data-table";
import { useSuspenseQuery } from "@tanstack/react-query";
import { columns } from "./columns";

export default function TagsAdmin() {
  const { data } = useSuspenseQuery({
    queryKey: ["tags", "admin"],
    queryFn: async () => (await client.getTags()).getTags,
  });
  return (
    <DataTable<GetTagsQuery["getTags"][number], unknown>
      data={data}
      columns={columns}
    />
  );
}
