import { ObjectType, Field, ID } from "type-graphql";

@ObjectType("Block")
export class Block {
  @Field(() => ID)
  value!: string;

  @Field(() => String)
  type!: string;

  @Field(() => String)
  name!: string;
}

@ObjectType("Hero")
export class Hero {
  @Field(() => ID)
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

@ObjectType("Page")
export class Page {
  @Field(() => ID)
  id!: string;

  @Field(() => ID)
  slug!: string;

  @Field(() => String)
  title!: string;

  @Field(() => Hero)
  hero!: Hero;

  @Field(() => [Block])
  blocks!: Block[];

  @Field(() => String)
  createdDate!: Date;

  @Field(() => String)
  updatedDate!: Date;

  @Field(() => Boolean)
  published: Boolean = false;
}

@ObjectType("PageAdmin")
export class PageAdmin {
  @Field(() => ID)
  id!: string;

  @Field(() => ID)
  slug!: string;

  @Field(() => String)
  title!: string;

  @Field(() => String)
  createdDate!: Date;

  @Field(() => String)
  updatedDate!: Date;

  @Field(() => Boolean)
  published: Boolean = false;
}