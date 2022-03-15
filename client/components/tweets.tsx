import React from "react";
import { TweetFragmentFragment } from "../generated/graphql";
import Tweet from "./Tweet";
interface tweetsProps {
  tweets: TweetFragmentFragment[];
  clickEvent?: (id: number) => void;
}

const Tweets: React.FC<tweetsProps> = ({ tweets, clickEvent }) => {
  return (
    <div className="tweets px-20 m-auto">
      {tweets && (
        <>
          {tweets.map((tweet) => (
            <div key={tweet.id} className="tweetChild">
              <Tweet tweet={tweet} clickEvent={clickEvent} />
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default Tweets;
