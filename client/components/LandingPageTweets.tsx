import { Loading } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import {
  TweetFragmentFragment,
  useGetLandingPageTweetsQuery,
} from "../generated/graphql";
import Tweet from "./Tweet";

const LandingPageTweets: React.FC = () => {
  const { data, loading } = useGetLandingPageTweetsQuery();
  const [tweets, setTweets] = useState<TweetFragmentFragment[]>([]);
  useEffect(() => {
    if (data?.getLandingPageTweets) {
      setTweets(data.getLandingPageTweets);
    }
  }, [data]);
  return (
    <>
      {loading && (
        <Loading className="w-full flex justify-center h-[80vh] p-0 m-0 items-center" />
      )}
      <div className="tweets lg:px-20 m-auto ">
        {tweets && (
          <>
            {tweets.map((tweet) => (
              <div key={tweet.id} className="tweetChild">
                <Tweet tweet={tweet} />
              </div>
            ))}
          </>
        )}
      </div>
    </>
  );
};

export default LandingPageTweets;
