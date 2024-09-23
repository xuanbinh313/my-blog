import { ObjectType, Field, ID, InputType } from "type-graphql";
import { Tag } from "./tags.schema";


@ObjectType("Blog")
export class Blog {
  @Field(() => ID)
  id: number;

  @Field(() => ID)
  slug: string;

  @Field(() => [Tag])
  tags: Tag[] = [];

  @Field(() => String)
  title: string;

  @Field(() => String)
  content: string;

  @Field(() => String)
  image: string;

  @Field(() => Boolean)
  published: boolean = false;
}

@InputType("InputBlog")
export class InputBlog {
  @Field()
  slug: string;
  @Field()
  title: string;

  @Field(() => String)
  content: string;

  @Field(() => String)
  image: string;

  @Field(() => [String])
  tags: string[];
}

