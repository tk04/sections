import React from "react";
import TweetTest from "../components/Tweet";
import { useGetTweetsQuery } from "../generated/graphql";

interface tweetProps {}

const Tweet: React.FC<tweetProps> = ({}) => {
  const { data } = useGetTweetsQuery();
  return (
    <div>
      {data && data.getTweets && (
        <>
          {data.getTweets.map((tweet) => (
            <div key={tweet.id}>
              <TweetTest tweet={tweet} />
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default Tweet;
