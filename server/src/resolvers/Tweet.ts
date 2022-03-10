import { Arg, Ctx, Query, Resolver, UseMiddleware } from "type-graphql";
import { Tweet } from "../entities/Tweet";
import axios from "axios";
import { auth } from "../middleware/auth";
import { context } from "../types/types";

@Resolver()
export class TweetResolver {
  @Query(() => Tweet)
  @UseMiddleware(auth)
  async getTweet(@Arg("url") url: string, @Ctx() { req }: context) {
    try {
      const access_token = req.user!.twitterAccessToken;
      const tweetUrl = url.split("status/")[1];
      console.log("TOKEN: ", access_token);
      const tweetRes = await axios({
        method: "GET",
        url: `https://api.twitter.com/2/tweets/${tweetUrl}?expansions=attachments.poll_ids,attachments.media_keys,author_id&user.fields=profile_image_url,verified`,
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });
      // console.log(tweet.data);
      const tweet = tweetRes.data.data;
      const { text, id, attachments } = tweet;
      const user = tweetRes.data.includes.users[0];

      return { text, id, attachments, user };
    } catch (e: any) {
      // console.log(e);
      console.log(e.message);
      return "error";
    }
  }
}
