import React from "react";
import { H3 } from "./ui/typography";
import BackgroundComponent from "./background-component";

const FooterComponent = () => {
  return (
    <footer>
      <div className="relative text-muted-foreground flex flex-col gap-5 text-center items-center bg-destructive rounded-lg px-10 py-7">
        <BackgroundComponent />
        <H3 className="text-primary">Stabraq</H3>
        <div className="text-sm pt-6 w-full border-t border-muted-foreground">
          Made by Mejed | Powered by Framer
        </div>
      </div>
    </footer>
  );
};

export default FooterComponent;
