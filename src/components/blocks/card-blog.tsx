import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ChevronRight } from "lucide-react";
import { H3 } from "../ui/typography";
export function CardBlog() {
  return (
    <Card className="w-full border-0 relative p-5">
      <div className="flex justify-between items-center gap-8">
        <div className="flex flex-col gap-4 ">
          <H3>Starting and Growing a Career in Web Design</H3>
          <p className="text-muted-foreground">
            From honing your skills and building your portfolio to finding
            clients and establishing yourself in the industry.
          </p>
          <div className="flex justify-between text-muted-foreground">
            <div className="text-xs ">Mar 15, 2022</div>
            <div className="text-xs ">6 min read</div>
          </div>
        </div>
        <Button variant="destructive" size="icon">
          <ChevronRight className="text-foreground h-4 w-4" />
        </Button>
      </div>
    </Card>
  );
}
