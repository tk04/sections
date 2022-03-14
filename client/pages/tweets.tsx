import { Grid } from "@nextui-org/react";
import React from "react";
import TweetTest from "../components/Tweet";
import { useGetTweetsQuery } from "../generated/graphql";

interface tweetProps {}

const Tweet: React.FC<tweetProps> = ({}) => {
  const { data } = useGetTweetsQuery();
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
        gridTemplateRows: "repeat(auto-fill, minmax(100px, 1fr))",
        gridAutoFlow: "row dense",
        gridAutoRows: "200px",
        // gridAutoRows: "minmax(200px, 1fr)",
        // height: "100vh",
        margin: "0 500px",
        justifyContent: "center",
        // alignContent: "end",
        // gridGap: "7px",
      }}
      // className="flex flex-wrap w-[00px] h-64 "
    >
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
