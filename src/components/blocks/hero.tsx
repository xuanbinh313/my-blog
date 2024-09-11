import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { H1 } from "../ui/typography";
export function Hero() {
  return (
    <div className="w-full border-0 relative p-5">
      <div className="flex flex-col gap-4 text-center max-w-lg mx-auto">
        <figure className="flex flex-col gap-2">
          <img
            className="h-20 max-w-20 rounded-full object-cover mx-auto"
            src="https://framerusercontent.com/images/b5HcLGiq8nXy29HRuyCjLcs90.svg"
            alt="test"
          />
          <figcaption className="text-xs text-muted-foreground">
            @xuanbinh313
          </figcaption>
        </figure>
        <H1>BinhCoDev</H1>
        <p className="text-muted-foreground">
          Hi, I'm Christopher, a creative Web Designer who loves to craft
          visually stunning websites.
        </p>
      </div>
    </div>
  );
}
