import { ObjectType, Field, ID } from "type-graphql";

@ObjectType("Block")
export class Block {
  @Field(() => ID)
  id!: number;

  @Field(() => String)
  title!: string;

  @Field(() => String)
  type!: string;

  @Field(() => String)
  endpoint!: string;
}
