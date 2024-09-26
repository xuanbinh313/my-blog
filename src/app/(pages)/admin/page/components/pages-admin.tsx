"use client";
import { GetPagesQuery } from "@/app/__generated__/resolvers-types";
import { client } from "@/app/utils/api";
import { DataTable } from "@/components/data-table/data-table";
import { useSuspenseQuery } from "@tanstack/react-query";
import { columns } from "./columns";

export default function PagesAdmin() {
  const { data } = useSuspenseQuery({
    queryKey: ["pages", "admin"],
    queryFn: async () => (await client.getPages()).getPages,
  });
  return (
    <DataTable<GetPagesQuery["getPages"][number], unknown>
      data={data}
      columns={columns}
    />
  );
}
