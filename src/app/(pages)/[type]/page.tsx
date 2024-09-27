import { getQueryClient } from "@/app/get-query-client";
import { client } from "@/app/utils/api";
import BackgroundComponent from "@/components/background-component";
import Block from "@/components/blocks/block";
import { Hero } from "@/components/blocks/hero";

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
    </main>
  );
}
