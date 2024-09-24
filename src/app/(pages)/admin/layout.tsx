import { SidebarNav } from "@/components/side-navbar";
import { Separator } from "@/components/ui/separator";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Forms",
  description: "Advanced form example using react-hook-form and Zod.",
};

const sidebarNavItems = [
  {
    title: "Dashboard",
    href: "/admin",
  },
  {
    title: "Profile",
    href: "/admin/profile",
  },
  {
    title: "Blog",
    href: "/admin/blog",
  },
];

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <div className="hidden space-y-6 p-10 pb-16 md:block container">
      <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
        <aside className="-mx-4 lg:w-1/5">
          <SidebarNav items={sidebarNavItems} />
        </aside>
        <div className="flex flex-col gap-y-7 max-w-3xl mx-auto w-full">
          {children}
        </div>
      </div>
    </div>
  );
}
