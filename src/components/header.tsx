import React from "react";
import Navbar from "./navbar";
import { ModeToggle } from "./mode-toggle";

const HeaderComponent = () => {
  return (
    <header className="relative bg-destructive rounded-b-lg before:content-[' '] before:bg-pattern before:opacity-[0.03] before:bg-repeat before:top-0 before:bottom-0 before:left-0 before:right-0 before:absolute">
      <div className="relative flex justify-center items-center mx-auto h-[60px] ">
        <Navbar />
        <ModeToggle />
      </div>
    </header>
  );
};

export default HeaderComponent;
