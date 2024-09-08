import { gql } from "@apollo/client";
import Image from "next/image";
import { query } from "@/app/lib/ApolloClient"
const USER_QUERY = gql`
  query Query {
  dogs {
    name
  }
}
`;
export default async function Home() {
  const { data } = await query({
    query: USER_QUERY,
  });
  console.log(data)
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <h1>Main</h1>
        {data.dogs.map(item => <p>{item.name}</p>)}
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <h1>Footer</h1>
      </footer>
    </div>
  );
}
