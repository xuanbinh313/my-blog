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
  const headers = data.headers;
  return (
    <nav className="flex items-center space-x-4 lg:space-x-6 mx-6">
      {headers.map((header) => (
        <Link
          key={header.slug}
          className="text-foreground transition-colors hover:text-primary"
          href={header.slug}
        >
          {header.name}
        </Link>
      ))}
      <Link
        className="text-foreground transition-colors hover:text-primary"
        href={"/login "}
      >
        Login
      </Link>
    </nav>
  );
};

export default Navbar;
