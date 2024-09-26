import { ObjectType, Field, ID } from "type-graphql";
@ObjectType("Hero")
export class Hero {
  @Field(() => ID)
  id!: number;

  @Field(() => String)
  type!: string;

  @Field(() => String)
  image!: string;

  @Field(() => String)
  title!: string;

  @Field(() => String)
  subtitle: string | null = null;

  @Field(() => String)
  content: string | null = null;
}
