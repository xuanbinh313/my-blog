import { Card } from "@/components/ui/card";
import { H3 } from "../ui/typography";
import { getQueryClient } from "@/app/get-query-client";
import { client } from "@/app/utils/api";
import { Tag } from "@/app/__generated__/resolvers-types";
import Image from "next/image";

const CardTool: React.FC<{ data: Tag }> = ({ data }) => {
  return (
    <Card className="w-full border-0 relative p-5">
      <div className="flex justify-start items-center gap-5 h-full">
        <div>
          <Image
            className="h-12 max-w-12 rounded-lg object-contain"
            src={data.image}
            alt={data.title}
            width={48}
            height={48}
          />
        </div>
        <div className="flex flex-col">
          <H3>{data.title}</H3>
          <p className="text-muted-foreground">{data.content}</p>
        </div>
      </div>
    </Card>
  );
};
export async function ToolList() {
  const queryClient = getQueryClient();
  const { tags } = await queryClient.fetchQuery({
    queryKey: ["techs"],
    queryFn: async () => await client.getTags(),
  });
  return (
    <div className="grid grid-cols-2 gap-5 w-full">
      {tags.map((tag) => (
        <CardTool key={tag.slug} data={tag} />
      ))}
    </div>
  );
}
export default CardTool;
