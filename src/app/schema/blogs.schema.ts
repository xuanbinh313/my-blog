import { ObjectType, Field, ID } from "type-graphql";
import { Tag } from "./tags.schema";


@ObjectType("Blog")
export class Blog {
  @Field(() => ID)
  slug!: string;

  @Field(() => [Tag])
  tags: Tag[] = [];

  @Field(() => String)
  title!: string;

  @Field(() => String)
  content!: string;

  @Field(() => String)
  image!: string;

  @Field(() => String)
  published!: string;
}
