import { Metadata } from "next";

import BlogsAdmin from "./components/blogs-admin";
import { UserNav } from "./components/user-nav";

export const metadata: Metadata = {
  title: "Blogs",
  description: "Manage your blogs",
};

export default async function BlogsAdminPage() {
  return (
    <>
      <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
        <div className="flex items-center justify-between space-y-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Welcome back!</h2>
            <p className="text-muted-foreground">
              Here&apos;s a list of your tasks for this month!
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <UserNav />
          </div>
        </div>
        <BlogsAdmin />
      </div>
    </>
  );
}
