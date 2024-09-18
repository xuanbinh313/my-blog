import { ObjectType, Field, ID } from "type-graphql";

@ObjectType("Tag")
export class Tag {
  @Field(() => ID)
  id!: number;

  @Field(() => ID)
  slug!: string;

  @Field(() => String)
  title!: string;

  @Field(() => String)
  image!: string;

  @Field(() => String)
  content!: string;
}
