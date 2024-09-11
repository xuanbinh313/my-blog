import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { H2, H3 } from "../ui/typography";
const CardTool = () => {
  return (
    <Card className="w-full border-0 relative p-5">
        <div className="flex justify-start items-center gap-5">
          <div>
            <img
              className="h-12 max-w-12 rounded-lg object-cover"
              src="https://framerusercontent.com/images/pu2IWRFku4WAiY2wEU6XNj54VU.png"
              alt="test"
            />
          </div>
          <div className="flex flex-col">
            <H3>ReactJS</H3>
            <p className="text-muted-foreground">
              React Framework
            </p>
          </div>
        </div>
    </Card>
  );
};

export default CardTool;
