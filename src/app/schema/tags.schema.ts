import { ObjectType, Field, ID, Int, InputType } from "type-graphql";

@ObjectType("Tag")
export class Tag {
  @Field(() => ID)
  id!: number;

  @Field(() => String)
  slug!: string;

  @Field(() => String)
  title!: string;

  @Field(() => String)
  image!: string;

  @Field(() => String)
  content!: string;
}

@InputType("InputTag")
export class InputTag {
  @Field()
  slug!: string;
  
  @Field()
  title!: string;

  @Field(() => String)
  content!: string;

  @Field(() => String)
  image!: string;
}