import { cn } from "@/lib/utils";
import React from "react";

const ArticleComponent = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <article ref={ref} className={cn("flex flex-col gap-5 row-start-2 items-center sm:items-start bg-destructive rounded-lg px-10 py-7 relative before:content-[' '] before:bg-pattern before:opacity-[0.03] before:bg-repeat before:top-0 before:bottom-0 before:left-0 before:right-0 before:absolute", className)} {...props} />
));
ArticleComponent.displayName = "ArticleComponent";

export { ArticleComponent };
