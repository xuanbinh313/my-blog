import type { Block } from "@/app/__generated__/resolvers-types";
import React from "react";
import { ArticleComponent } from "../article-component";
import BackgroundComponent from "../background-component";
import { H2 } from "../ui/typography";
import { BlogList } from "./card-blog";
import CardProject from "./card-project";
import { ContactForm } from "./contact-form";
import { ToolList } from "./card-tool";

const type: { [key: string]: React.ComponentType<any> } = {
  blogs: BlogList,
  project: CardProject,
  cta: ContactForm,
  tags: ToolList,
};

interface BlockProps {
  blocks?: Block[];
}

const BlockItem = async ({ block }: { block: Block }) => {
  const Component = type[block.type];
  if (!Component) return null;
  return <Component {...block} />;
};

const Block = ({ blocks }: BlockProps) => {
  return (
    <>
      {blocks?.map((block) => (
        <ArticleComponent key={block.value}>
          <BackgroundComponent />
          <H2 className="text-primary">{block.name}</H2>
          <BlockItem block={block} />
        </ArticleComponent>
      ))}
    </>
  );
};

export default Block;
