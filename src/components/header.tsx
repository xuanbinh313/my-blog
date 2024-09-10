import React from "react";
import Navbar from "./navbar";
import { ModeToggle } from "./mode-toggle";

const HeaderComponent = () => {
  return (
    <header className="container flex justify-between mx-auto">
      <div className="social">
        <a href="fb.com">facebook</a>
        <a href="fb.com">facebook</a>
        <a href="fb.com">facebook</a>
        <a href="fb.com">facebook</a>
      </div>
      <Navbar/>
      <ModeToggle/>
    </header>
  );
};

export default HeaderComponent;
