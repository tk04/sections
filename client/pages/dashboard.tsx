import { Button, Input } from "@nextui-org/react";

import React, { useRef, useState } from "react";
import Tweet from "../components/Tweet";
import { useGetTweetMutation } from "../generated/graphql";

interface dashboardProps {}

const Dashboard: React.FC<dashboardProps> = ({}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [getTweet, { data }] = useGetTweetMutation();
  const tweetHandler = () => {
    getTweet({
      variables: {
        url: inputRef.current!.value,
      },
    });
  };
  console.log("DATA: ", data);

  return (
    <div className="ml-20">
      <br />
      <Input
        size="lg"
        className="mb-2 w-60"
        placeholder="Tweet URL"
        aria-label="Tweet URL"
        initialValue="https://twitter.com/_lordmax_/status/1503137288695341057?s=20&t=2y6GcTryK3R8jFNQCu6nCg"
        ref={inputRef}
      />
      <br />
      <Button onClick={tweetHandler} size="lg">
        Save
      </Button>
      {data && data.getTweet && <Tweet tweet={data.getTweet} />}
    </div>
  );
};

export default Dashboard;
