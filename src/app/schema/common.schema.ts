import { Field, ObjectType } from "type-graphql";

@ObjectType("ResponseBase")
export class ResponseBase {
  @Field(() => Boolean)
  success: boolean;
}
