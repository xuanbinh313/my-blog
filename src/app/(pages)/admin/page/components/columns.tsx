"use client";
import { GetPagesQuery } from "@/app/__generated__/resolvers-types";
import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";

export const columns: ColumnDef<GetPagesQuery["getPages"][number]>[] = [
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
    accessorKey: "title",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Title" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex flex-col space-2">
          <Link
            className="max-w-[500px] truncate font-medium"
            href={`/admin/page/${row.original.id}-${row.getValue("slug")}`}
          >
            {row.getValue("title")}
          </Link>
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
