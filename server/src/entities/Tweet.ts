import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class TweetUser {
  @Field()
  profile_image_url: string;
  @Field()
  verified: boolean;
  @Field()
  name: string;
  @Field()
  id: number;
  @Field()
  username: string;
}
@ObjectType()
export class Poll {
  @Field()
  label: string;
  @Field()
  votes: number;
}
@ObjectType()
export class Media {
  @Field()
  media_key: number;
  @Field()
  type: string;
  @Field(() => String, { nullable: true })
  url: string;
}
@ObjectType()
export class Tweet {
  @Field()
  text: string;
  @Field()
  id: number;
  @Field()
  likes: number;
  @Field()
  user: TweetUser;
  @Field()
  retweets: number;
  @Field()
  replies: number;
  @Field(() => [Poll], { nullable: true })
  pollOptions: Poll[];
  @Field(() => [Media], { nullable: true })
  media: Media[];
}
