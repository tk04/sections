import { Arg, Ctx, Query, Resolver, UseMiddleware } from "type-graphql";
import { Tweet } from "../entities/Tweet";
import axios from "axios";
import { auth } from "../middleware/auth";
import { context } from "../types/types";
@Resolver()
export class TweetResolver {
  @Query(() => String)
  @UseMiddleware(auth)
  async getTweet(@Arg("url") url: string, @Ctx() { req }: context) {
    try {
      const access_token = req.user!.twitterAccessToken;
      const tweetUrl = url.split("status/")[1];
      const tweet = await axios({
        method: "GET",
        url: `https://api.twitter.com/2/tweets/${tweetUrl}?expansions=attachments.poll_ids,attachments.media_keys,author_id&user.fields=profile_image_url,verified`,
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });
      // const tweet = await axios.post(
      //   `https://api.twitter.com/2/tweets/${tweetUrl}`,
      //   {},
      //   { headers: { Authorization: `Bearer ${access_token}` } }
      // );
      // console.log(tweet.data);
      console.log(tweet.data.includes);
      return "TWEET IN CONSOLE";
    } catch (e) {
      console.log(e);
      return "error";
    }
  }
}
