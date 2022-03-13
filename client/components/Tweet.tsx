import React from "react";
import {
  GetTweetMutation,
  Tweet,
  TweetFragmentFragment,
} from "../generated/graphql";

interface TweetProps {
  tweet: TweetFragmentFragment;
}

const Tweet: React.FC<TweetProps> = ({ tweet }) => {
  return (
    <div>
      <img src={tweet.user.profile_image_url} alt="profile" />
      <h1> TEXT: {tweet.text}</h1>
      <h1> Likes: {tweet.likes}</h1>
      <h1> RETWEETS: {tweet.retweets}</h1>
      <h1> RETWEETS: {tweet.replies}</h1>
    </div>
  );
};

export default Tweet;
