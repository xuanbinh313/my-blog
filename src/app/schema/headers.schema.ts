import { ObjectType, Field, ID } from "type-graphql";

@ObjectType()
export class HeaderItem {
  @Field(() => ID)
  id!: string;
  @Field(() => ID)
  slug!: string;
  @Field(() => String)
  name!: string;
}
