import { Field, ID, InputType, ObjectType } from "type-graphql";
import { Tag } from "./tags.schema";


@ObjectType("Blog")
export class Blog {
  @Field(() => ID)
  id: number;

  @Field(() => String)
  slug: string;

  @Field(() => [Tag])
  tags: Tag[] = [];

  @Field(() => String)
  title: string;

  @Field(() => String)
  summary: string;

  @Field(() => String)
  content: string;

  @Field(() => String)
  image: string;

  @Field(() => String)
  createdAt!: Date;

  @Field(() => String, { nullable: true })
  updatedAt!: Date | null;

  @Field(() => String, { nullable: true })
  publishedAt!: Date | null;
  
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
  summary: string;
  
  @Field(() => String)
  content: string;

  @Field(() => String)
  image: string;

  @Field(() => [Number])
  tags: number[];
  
  @Field(() => Boolean)
  published: boolean = false;
}

