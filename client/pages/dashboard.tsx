import { Button, Input, Loading } from "@nextui-org/react";
import React, { useRef, useState } from "react";
import Managetweets from "../components/ManageTweets";
import Tweets from "../components/tweets";
import {
  TweetFragmentFragment,
  useAddTweetsMutation,
  useGetTweetMutation,
} from "../generated/graphql";

interface dashboardProps {}

const Dashboard: React.FC<dashboardProps> = ({}) => {
  const [tweets, setTweets] = useState<TweetFragmentFragment[]>([]);
  const [saveLoading, setLoading] = useState<boolean>(false);
  const [label, setLabel] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);
  const [addTweets] = useAddTweetsMutation();
  const [getTweet, { data }] = useGetTweetMutation();
  const clickHandler = (id: number) => {
    setTweets((prev) => {
      return prev.filter((tweet) => tweet.id !== id);
    });
  };
  const tweetHandler = async () => {
    const text = inputRef.current!.value;
    if (!text.includes("https://twitter.com/") || !text.includes("status/")) {
      alert("Please enter a valid tweet URL");
      return;
    }
    const tweetData = await getTweet({
      variables: {
        url: text,
      },
    });
    setTweets([...tweets, tweetData.data!.getTweet]);
    inputRef.current!.value = "";
  };

  const saveHandler = async () => {
    if (tweets.length > 0) {
      setLoading(true);
      const tweetURLs: string[] = tweets.map((tweet) => tweet.url!);
      await addTweets({ variables: { urls: tweetURLs } });
      setTweets([]);
      setLoading(false);
      setLabel("Tweets saved successfully");
      setTimeout(() => {
        setLabel("");
      }, 3000);
    } else {
      alert("Please add tweets");
    }
  };
  return (
    <div className="p-20">
      <br />
      <div className="flex flex-row items-center space-x-4">
        <Input
          size="md"
          className="mb-2 w-60"
          placeholder="Tweet URL"
          aria-label="Tweet URL"
          initialValue="https://twitter.com/_lordmax_/status/1503137288695341057?s=20&t=2y6GcTryK3R8jFNQCu6nCg"
          ref={inputRef}
          label={label}
        />

        <Button onClick={tweetHandler} size="md" light bordered>
          Preview
        </Button>
      </div>
      {tweets && (
        <div>
          <Tweets tweets={tweets} clickEvent={clickHandler} />
        </div>
      )}
      <br />
      <br />
      {tweets.length > 0 && !saveLoading && (
        <Button onClick={saveHandler} size="lg" className="w-80 m-auto">
          Save
        </Button>
      )}
      {saveLoading && <Loading />}
      <Managetweets refresh={saveLoading} />
    </div>
  );
};

export default Dashboard;
