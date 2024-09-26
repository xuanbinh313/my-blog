import { Metadata } from "next";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import PagesAdmin from "./components/pages-admin";

export const metadata: Metadata = {
  title: "Blogs",
  description: "Manage your blogs",
};

export default async function PagesAdminPage() {
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
            <Button asChild>
              <Link href="/admin/page/new">Add</Link>
            </Button>
          </div>
        </div>
        <PagesAdmin />
      </div>
    </>
  );
}
