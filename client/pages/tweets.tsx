import { Grid } from "@nextui-org/react";
import React from "react";
import TweetTest from "../components/Tweet";
import { useGetTweetsQuery } from "../generated/graphql";

interface tweetProps {}

const Tweet: React.FC<tweetProps> = ({}) => {
  const { data } = useGetTweetsQuery();
  return (
    <div className="tweets px-20 m-auto">
      {data && data.getTweets && (
        <>
          {data.getTweets.map((tweet) => (
            <div key={tweet.id} className="tweetChild">
              <TweetTest tweet={tweet} />
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default Tweet;
