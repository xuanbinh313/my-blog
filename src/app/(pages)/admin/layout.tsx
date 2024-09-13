import React, { PropsWithChildren } from "react";

const LayoutAdmin:React.FC<PropsWithChildren> = ({ children }) => {
  return <main>{children}</main>;
};

export default LayoutAdmin;
