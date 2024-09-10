import React from "react";
import Navbar from "./navbar";
import { ModeToggle } from "./mode-toggle";

const HeaderComponent = () => {
  return (
    <header className="">
      <div className="flex justify-center items-center mx-auto bg-destructive h-[60px] rounded-b-lg">
        <Navbar />
        <ModeToggle />
      </div>
    </header>
  );
};

export default HeaderComponent;
