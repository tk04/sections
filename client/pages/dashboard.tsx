import { Button, Input } from "@nextui-org/react";

import React, { useRef, useState } from "react";
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

  console.log("DATA : ", data);

  return (
    <div className="ml-20">
      <br />
      <Input
        size="lg"
        className="mb-2 w-60"
        placeholder="Tweet URL"
        aria-label="Tweet URL"
        initialValue="https://twitter.com/Crimsix/status/1502508572613165056"
        ref={inputRef}
      />
      <br />
      <Button onClick={tweetHandler} size="lg">
        Save
      </Button>
    </div>
  );
};

export default Dashboard;
