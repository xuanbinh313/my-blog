"use client";
import { client } from "@/app/utils/api";
import { useSuspenseQuery } from "@tanstack/react-query";
import Link from "next/link";
import React from "react";

const Navbar = () => {
  const { data } = useSuspenseQuery({
    queryKey: ["headers"],
    queryFn: async () => await client.getHeaders(),
  });
  console.log(data);
  const headers = data.headers;
  return (
    <nav className="flex items-center space-x-4 lg:space-x-6 mx-6">
      {headers.map((header) => (
        <Link
          className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
          href={header.slug}
        >
          {header.name}
        </Link>
      ))}
      <Link
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
        href={"/login "}
      >
        Login
      </Link>
    </nav>
  );
};

export default Navbar;
