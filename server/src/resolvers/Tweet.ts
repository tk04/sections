import axios from "axios";
import { Arg, Query, Resolver } from "type-graphql";
import { Tweet } from "../entities/Tweet";

@Resolver()
export class TweetResolver {
  @Query(() => Tweet)
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
