import { Separator } from "@/components/ui/separator";
import React from "react";

export interface AdminHeaderProps {
  actions?: React.ReactNode;
  title?: string;
}

const AdminHeader: React.FC<AdminHeaderProps> = ({
  title = "Page",
  actions,
}) => {
  return (
    <>
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">{title}</h2>
        <div className="flex items-center space-x-2">{actions}</div>
      </div>
      <Separator className="my-6" />
    </>
  );
};

export default AdminHeader;
