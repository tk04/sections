import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class User {
  @Field()
  name: string;
  @Field()
  email: string;
  @Field()
  picture: string;
  @Field()
  id: string;
  @Field()
  googleId: string;
}
