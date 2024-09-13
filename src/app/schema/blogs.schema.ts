import { ObjectType, Field, ID } from "type-graphql";

@ObjectType('TagAttribute')
export class TagAttribute {
  @Field(() => ID)
  key!: string;

  @Field(() => String)
  value!: string;
}

@ObjectType('Blog')
export class Blog {
  @Field(() => ID)
  slug!: string;

  @Field(() => [TagAttribute])
  tags: TagAttribute[] = [];

  @Field(() => String)
  title!: string;

  @Field(() => [String])
  content: string[] = [];

  @Field(() => String)
  image!: string;

  @Field(() => String)
  author!: string;

  @Field(() => String)
  published!: string;
}
