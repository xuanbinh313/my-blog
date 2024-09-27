import { ObjectType, Field, ID } from "type-graphql";

@ObjectType("BlockProject")
export class Block {
  @Field(() => ID)
  value!: string;
  
  @Field(() => String)
  type!: string;

  @Field(() => String)
  name!: string;
}

@ObjectType("HeroProject")
export class Hero {
  @Field(() => ID)
  type!: string;

  @Field(() => String)
  image!: string;

  @Field(() => String)
  title!: string;

  @Field(() => String)
  subtitle!: string;

  @Field(() => String)
  content!: string;
}

@ObjectType("Project")
export class Project {
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
  createdDate!: string;

  @Field(() => String)
  updatedDate!: string;

  @Field(() => Boolean)
  published: boolean = false;
}
