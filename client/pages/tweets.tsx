import { Grid } from "@nextui-org/react";
import React from "react";
import TweetTest from "../components/Tweet";
import { useGetTweetsQuery } from "../generated/graphql";

interface tweetProps {}

const Tweet: React.FC<tweetProps> = ({}) => {
  const { data } = useGetTweetsQuery();
  return (
    <div className="flex flex-wrap flex-auto justify-center place-items-center justify-items-center self-stretch">
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
