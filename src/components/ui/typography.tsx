import { cn } from "@/lib/utils";
import React from "react";

const H1 = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h1 ref={ref} className={cn("text-3xl font-medium", className)} {...props} />
));
H1.displayName = "H1";

const H2 = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h2 ref={ref} className={cn("text-2xl font-medium", className)} {...props} />
));
H2.displayName = "H2";

const H3 = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3 ref={ref} className={cn("text-lg font-medium", className)} {...props} />
));
H3.displayName = "H3";

export { H3, H2, H1 };
