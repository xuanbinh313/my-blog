import { ObjectType, Field, ID } from "type-graphql";
import { Hero } from "./heros.schema";
import { Block } from "./blocks.schema";



@ObjectType("Page")
export class Page {
  @Field(() => ID)
  id!: string;

  @Field(() => String)
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
  id!: number;

  @Field(() => ID)
  slug!: string;

  @Field(() => String)
  title!: string;

  @Field(() => ID)
  heroId!: number;

  @Field(() => String)
  createdDate!: Date;

  @Field(() => String)
  updatedDate!: Date;

  @Field(() => Boolean)
  published: Boolean = false;
}