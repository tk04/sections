import React from "react";
import TweetTest from "../components/Tweet";
import Tweets from "../components/tweets";
import { useGetTweetsQuery } from "../generated/graphql";

interface tweetProps {}

const Tweet: React.FC<tweetProps> = ({}) => {
  const { data } = useGetTweetsQuery();
  return (
    <div>
      {data && data.getTweets && (
        <>
          <Tweets tweets={data.getTweets} />
        </>
      )}
    </div>
  );
};

export default Tweet;
