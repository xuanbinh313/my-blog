"use client";

import { ColumnDef } from "@tanstack/react-table";

import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";

import { GetBlogsQuery } from "@/app/__generated__/resolvers-types";
import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import Image from "next/image";
import Link from "next/link";

export const columns: ColumnDef<GetBlogsQuery["blogs"][number]>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <div className="h-full flex items-center pb-1.5">
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
          className="translate-y-[2px]"
        />
      </div>
    ),
    cell: ({ row }) => (
      <div className="h-full flex items-center pb-1.5">
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
          className="translate-y-[2px]"
        />
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "image",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Image" />
    ),
    cell: ({ row }) => (
      <div className="flex justify-center items-center">
        <Image
          width={50}
          height={30}
          alt={row.getValue("image")}
          src={`/assets/${row.getValue("image")}`}
        />
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "title",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Title" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex flex-col space-2">
          <Link
            className="max-w-[500px] truncate font-medium"
            href={`/admin/blog/${row.getValue("slug")}`}
          >
            {row.getValue("title")}
          </Link>
          <div>
            {row.original.tags.map((it) => (
              <Badge variant="outline">{it.title}</Badge>
            ))}
          </div>
        </div>
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "slug",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Slug" />
    ),
    cell: ({ row }) => <div>{row.getValue("slug")}</div>,
    enableSorting: false,
    enableHiding: false,
  },
];
