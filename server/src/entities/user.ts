import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class User {
  @Field()
  name: string;
  @Field(() => String, { nullable: true })
  email: string;
  @Field()
  picture: string;
  @Field()
  id: string;
  @Field()
  googleId: string;
}
