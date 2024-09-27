import { ObjectType, Field, ID, InputType } from "type-graphql";
import { Hero } from "./heros.schema";
import { Block } from "./blocks.schema";

@ObjectType("Page")
export class Page {
  @Field(() => ID)
  id!: number;

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

  @Field(() => String, { nullable: true })
  updatedDate!: Date | null;

  @Field(() => Boolean)
  published: boolean = false;

  @Field(() => String, { nullable: true })
  publishedAt!: Date | null;
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
  published: boolean = false;
}

@InputType("InputPage")
export class InputPage {

  @Field(() => String)
  slug!: string;
  
  @Field(() => String)
  title!: string;

  @Field(() => ID)
  heroId!: number;

  @Field(() => Boolean)
  published: boolean = false;

  @Field(() => [Number])
  blocks!: number[];
}

