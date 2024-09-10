import { ModeToggle } from "@/components/mode-toggle";
import Posts from "./components/Posts";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function Home() {
  return (
    <div className="container">
      <main className="hidden flex-col md:flex">
        <h1>Main</h1>
        <div className="flex h-16 items-center px-4 justify-between">
          <Button>Test</Button>
          <nav className="flex items-center space-x-4 lg:space-x-6 mx-6">
            <Link
              href="/about"
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              Home
            </Link>
            <Link
              href="/about"
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              About
            </Link>
            <Link
              href="/about"
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              Services
            </Link>
            <Link
              href="/about"
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              Portfolio
            </Link>
            <Link
              href="/about"
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              Contact
            </Link>
          </nav>
          <Button>Test</Button>
        </div>

        <Button className="rounded-full" variant={"destructive"}>
          Hire Me
        </Button>
        <ModeToggle />
        <Posts />
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <h1>Footer</h1>
      </footer>
    </div>
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
