import type { Hero as HeroType } from "@/app/__generated__/resolvers-types";
import Image from "next/image";
import { H1 } from "../ui/typography";

interface HeroProps {
  data?: HeroType;
}
export function Hero({ data }: HeroProps) {
  return (
    <div className="w-full border-0 relative p-5">
      <div className="flex flex-col gap-4 text-center max-w-lg mx-auto">
        <figure className="flex flex-col gap-2">
          {data?.image && (
            <Image
              className="rounded-full object-cover mx-auto"
              src={data?.image}
              alt="test"
              width={80}
              height={80}
            />
          )}
          <figcaption className="text-xs text-muted-foreground">
            {data?.subtitle}
          </figcaption>
        </figure>
        <H1>{data?.title}</H1>
        <p className="text-muted-foreground">{data?.content}</p>
      </div>
    </div>
  );
}
