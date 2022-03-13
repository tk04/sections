import axios from "axios";
import {
  Arg,
  Ctx,
  Field,
  InputType,
  Mutation,
  Query,
  Resolver,
  UseMiddleware,
} from "type-graphql";
import { Tweet } from "../entities/Tweet";
import { auth } from "../middleware/auth";
import { context } from "../types/types";
import { getTweetsHelper } from "../utils/getTweets";
export type TweetsCreateManyInput = {
  id?: string;
  userId: string;
  tweet: string;
};
@InputType()
class TweetInput {
  @Field()
  tweet: string;
  @Field(() => String, { nullable: true })
  userId?: string;
}

@Resolver()
export class TweetResolver {
  @Query(() => [Tweet])
  @UseMiddleware(auth)
  async getTweets(@Ctx() { req, prisma }: context) {
    const tweets = await prisma.tweets.findMany({
      where: { userId: req.user!.id },
    });
    console.log(tweets);
    const result = await getTweetsHelper(tweets);

    return result;
  }

  @Mutation(() => Boolean)
  @UseMiddleware(auth)
  async addTweets(
    @Arg("tweetURLs", () => [TweetInput])
    tweetURLs: TweetInput[],
    @Ctx() { req, prisma }: context
  ) {
    try {
      tweetURLs.forEach((tweet) => (tweet.userId = req.user!.id));
      const tweets = await prisma.tweets.createMany({
        data: tweetURLs as TweetsCreateManyInput[],
      });
      console.log(tweets);
      return true;
    } catch (e) {
      return false;
    }
  }
  @Mutation(() => Tweet)
  async getTweet(@Arg("url") url: string) {
    try {
      const access_token = process.env.TWITTER_ACCESS_TOKEN;

      const tweetUrl = url.split("status/")[1];
      const tweetRes = await axios({
        method: "GET",
        url: `https://api.twitter.com/2/tweets/${tweetUrl}?expansions=attachments.poll_ids,attachments.media_keys,author_id&user.fields=profile_image_url,verified&tweet.fields=public_metrics&media.fields=url,preview_image_url`,
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });
      // console.log(tweetRes.data.includes.polls[0].options);
      const pollOptions: any[] =
        tweetRes.data.includes?.polls &&
        tweetRes.data.includes?.polls[0].options;

      const tweet = tweetRes.data.data;

      const {
        text,
        id,
        attachments,
        public_metrics: {
          like_count: likes,
          retweet_count: retweets,
          reply_count: replies,
        },
      } = tweet;
      // console.log(tweet);

      const user = tweetRes.data.includes.users[0];
      return {
        text,
        id,
        attachments,
        likes,
        user,
        retweets,
        replies,
        pollOptions,
        media: tweetRes.data.includes.media,
      };
    } catch (e: any) {
      console.log("ERROR: ", e.message);
      return "error";
    }
  }
}
