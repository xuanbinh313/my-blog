import React from "react";
import { H3 } from "./ui/typography";

const FooterComponent = () => {
  return (
    <footer>
      <div className="text-muted-foreground flex flex-col gap-5 divide-y divide-muted-foreground text-center items-center bg-destructive rounded-lg px-10 py-7 relative before:content-[' '] before:bg-pattern before:opacity-[0.03] before:bg-repeat before:top-0 before:bottom-0 before:left-0 before:right-0 before:absolute">
        <H3 className="text-primary">Stabraq</H3>
        <div className="text-sm pt-6 w-full">
          Made by Mejed | Powered by Framer
        </div>
      </div>
    </footer>
  );
};

export default FooterComponent;
