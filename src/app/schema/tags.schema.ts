import { ObjectType, Field, ID, InputType } from "type-graphql";

@ObjectType("Tag")
export class Tag {
  @Field(() => ID)
  id!: number;

  @Field(() => String)
  slug!: string;

  @Field(() => String)
  title!: string;

  @Field(() => String, { nullable: true })
  link: string | null;

  @Field(() => String)
  image!: string;

  @Field(() => String)
  content!: string;
}

@InputType("InputTag")
export class InputTag {
  @Field(() => String)
  slug: string;

  @Field()
  title: string;

  @Field(() => String, { nullable: true })
  link: string | null;

  @Field(() => String)
  content: string;

  @Field(() => String)
  image: string;
}

@ObjectType("ResponseTag")
export class ResponseTag {
  @Field(() => Boolean)
  success!: boolean;
}