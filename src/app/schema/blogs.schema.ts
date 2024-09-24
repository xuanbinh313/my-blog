import { ObjectType, Field, ID, InputType, Int } from "type-graphql";
import { Tag, InputTag } from "./tags.schema";


@ObjectType("Blog")
export class Blog {
  @Field(() => Int)
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

  @Field(() => [Number])
  tags: number[];
  
  @Field(() => Boolean)
  published: boolean = false;
}

