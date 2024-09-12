import { ArticleComponent } from "@/components/article-component";
import BackgroundComponent from "@/components/background-component";
import { CardBlog } from "@/components/blocks/card-blog";
import CardProject from "@/components/blocks/card-project";
import CardTool from "@/components/blocks/card-tool";
import { ContactForm } from "@/components/blocks/contact-form";
import { Hero } from "@/components/blocks/hero";
import HeroNoImage from "@/components/blocks/hero-no-image";
import Posts from "@/components/Posts";
import { Button } from "@/components/ui/button";
import { H2, H3 } from "@/components/ui/typography";
import dynamic from "next/dynamic";

const RichtextEditor = dynamic(() => import("@/components/richtext-editor"), {
  ssr: false,
});
export default async function Home() {
  return (
    <main className="flex flex-col gap-7">
      <div className="bg-destructive rounded-lg px-10 py-7 relative ">
        <BackgroundComponent />
        <Hero />
      </div>
      <HeroNoImage />
      <ArticleComponent>
        <BackgroundComponent />
        <H2 className="text-primary">Projects</H2>
        <CardProject />
        <CardProject />
        <CardProject />
      </ArticleComponent>
      <ArticleComponent>
        <BackgroundComponent />
        <H2 className="text-primary">Technical</H2>
        <div className="grid grid-cols-3 gap-5 w-full">
          <CardTool />
          <CardTool />
          <CardTool />
          <CardTool />
          <CardTool />
        </div>
      </ArticleComponent>
      <ArticleComponent>
        <BackgroundComponent />
        <H2 className="text-primary">Blogs</H2>
        <CardBlog />
        <CardBlog />
        <CardBlog />
        <CardBlog />
      </ArticleComponent>
      <ArticleComponent>
        <BackgroundComponent />
        <ContactForm/>
      </ArticleComponent>
      <div className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <RichtextEditor />
        <Posts />
      </div>
    </main>
  );
}

// import {
//   dehydrate,
//   HydrationBoundary,
//   QueryClient,
//   useQuery,
//   useSuspenseQuery,
// } from "@tanstack/react-query";
// import { getDogs, queryClient } from "./utils/api";
// import { getQueryClient } from "./get-query-client";

// export default async function Home() {
//   const queryClient = getQueryClient();
//   const data  = await queryClient.fetchQuery({
//     queryKey: ["dogs"],
//     queryFn: async () => await getDogs(),
//   });
// queryClient.prefetchQuery({
//   queryKey: ["blogs"],
//   queryFn: async () => await client.getBlogs(),
// });
//   return (
//     <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
//       <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
//         <h1>Main</h1>
//         {data.dogs.map(item => <p>{item.name}</p>)}
//       </main>
//       <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
//         <h1>Footer</h1>
//       </footer>
//     </div>
//   );
// }
