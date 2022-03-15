import Script from "next/script";
import React from "react";
import TweetTest from "../components/Tweet";
import Tweets from "../components/tweets";
import { useGetTweetsQuery } from "../generated/graphql";

interface tweetProps {}

const Tweet: React.FC<tweetProps> = ({}) => {
  const { data } = useGetTweetsQuery();
  return (
    <div>
      <Script src="/iframeResize.js" strategy="beforeInteractive" />
      {data && data.getTweets && (
        <>
          <Tweets tweets={data.getTweets} />
        </>
      )}
    </div>
  );
};

export default Tweet;
