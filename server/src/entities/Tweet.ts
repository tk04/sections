import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class Tweet {
  @Field()
  text: string;
  @Field()
  name: string;
  @Field()
  picture: string;
  @Field()
  username: string;
  @Field()
  id: number;
  @Field()
  likes: number;
  @Field()
  includes: any[];
}
