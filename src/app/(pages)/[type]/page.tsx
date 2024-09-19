import { getQueryClient } from "@/app/get-query-client";
import { client } from "@/app/utils/api";
import BackgroundComponent from "@/components/background-component";
import Block from "@/components/blocks/block";
import CardProject from "@/components/blocks/card-project";
import { Hero } from "@/components/blocks/hero";
import HeroNoImage from "@/components/blocks/hero-no-image";
import dynamic from "next/dynamic";

const RichTextEditor = dynamic(() => import("@/components/richtext-editor"), {
  ssr: false,
});
const BlockComponents = {
  projects: CardProject,
};
interface Params {
  type: string;
}

export default async function Home({ params }: { params: Params }) {
  const queryClient = getQueryClient();
  const page = await queryClient.fetchQuery({
    queryKey: ["page"],
    queryFn: async () => (await client.getPage({ slug: params.type })).page,
  });
  const hero = page?.hero;
  const blocks = page?.blocks;
  return (
    <main className="flex flex-col gap-7">
      <div className="bg-destructive rounded-lg px-10 py-7 relative ">
        <BackgroundComponent />
        <Hero data={hero} />
      </div>
      <Block blocks={blocks} />

      <div className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <HeroNoImage />
      </div>
    </main>
  );
}
