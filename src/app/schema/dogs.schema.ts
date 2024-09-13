import { ObjectType, Field, ID } from "type-graphql";

@ObjectType('DogAttribute')
export class DogAttribute {
  @Field(() => ID)
  key!: string;

  @Field(() => String)
  value!: string;
}

@ObjectType('Dog')
export class Dog {
  @Field(() => ID)
  name!: string;

  @Field(() => [DogAttribute])
  attributes!: DogAttribute[];

  @Field(() => [String])
  description: string[] =[];

  @Field(() => String)
  image!: string;

  @Field(() => Number)
  ageInWeeks!: number;

  @Field(() => String)
  sex!: string;

  @Field(() => String)
  breed!: string;

  @Field(() => String)
  color!: string;

  @Field(() => Number)
  fee!: number;

  @Field(() => Number)
  weight!: number;

  @Field(() => String)
  availableDate!: string;
}