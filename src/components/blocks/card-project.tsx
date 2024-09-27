import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { H3 } from "../ui/typography";
import Image from "next/image";
const CardProject = () => {
  return (
    <Card className="w-full border-0 relative px-5 py-3">
      <div className="flex justify-between items-center gap-8">
        <div className="flex justify-start items-center gap-5">
          <div>
            <Image
              className="h-20 max-w-20 rounded-lg object-cover"
              src="https://framerusercontent.com/images/pu2IWRFku4WAiY2wEU6XNj54VU.png"
              alt="test"
              width={80}
              height={80}
            />
          </div>
          <div className="flex flex-col">
            <H3>Starting and Growing a Career in Web Design</H3>
            <p className="text-muted-foreground">
              From honing your skills and building your portfolio to finding
            </p>
          </div>
        </div>
        <Button variant="destructive" size="icon">
          <ChevronRight className="text-foreground h-4 w-4" />
        </Button>
      </div>
    </Card>
  );
};

export default CardProject;
