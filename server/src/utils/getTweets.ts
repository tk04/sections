import { Tweets } from "@prisma/client";
import axios from "axios";
import { Tweet } from "../entities/Tweet";

// const getTweets = async (tweets: Tweets[]) => {
//   const result = await Promise.all(
//     tweets.map(async (tweet) => {
//       const { data } = await axios.get(
//         `https://api.twitter.com/1.1/statuses/show.json?id=${tweet.tweetId}&tweet_mode=extended`
//       );
//       return data;
//     })
//   );

//   return result;
// };
export const getTweetsHelper = async (tweets: Tweets[]) => {
  try {
    const access_token = process.env.TWITTER_ACCESS_TOKEN;

    // let results: Tweet[] = new Array();
    const results: Tweet[] = await Promise.all(
      tweets.map(async (val) => {
        const url = val.tweet.split("status/")[1].split("?")[0];
        const tweetRes = await axios({
          method: "GET",
          url: `https://api.twitter.com/2/tweets/${url}?expansions=attachments.poll_ids,attachments.media_keys,author_id&user.fields=profile_image_url,verified&tweet.fields=public_metrics&media.fields=url,preview_image_url`,
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        });

        const pollOptions: any[] =
          tweetRes.data.includes?.polls &&
          tweetRes.data.includes?.polls[0].options;

        const tweet = tweetRes.data.data;

        const {
          text,
          id,
          public_metrics: {
            like_count: likes,
            retweet_count: retweets,
            reply_count: replies,
          },
        } = tweet;
        //   console.log("TWEET: ", tweet);

        const user = tweetRes.data.includes.users[0];
        return {
          text,
          id,
          likes,
          user,
          retweets,
          replies,
          pollOptions,
          media: tweetRes.data.includes.media,
        };
      })
    );
    // console.log("RESULTS", results);
    return results;
  } catch (e) {
    console.log("ERROR: ", e);
  }
};
