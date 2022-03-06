import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class GoogleJWT {
  @Field()
  iss: string;
  azp: string;
  sub: string;
  picture: string;
  given_name: string;
  name: string;
  email_verified: boolean;
}
