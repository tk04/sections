import { Button, Input } from "@nextui-org/react";
import React, { useEffect, useRef, useState } from "react";
import Managetweets from "../components/ManageTweets";
import Navbar from "../components/NavBar";
import Tweets from "../components/Tweets";
import {
  GetMyTweetsDocument,
  TweetFragmentFragment,
  useAddTweetsMutation,
  useGetTweetMutation,
  useMeQuery,
} from "../generated/graphql";

interface dashboardProps {}

const Dashboard: React.FC<dashboardProps> = ({}) => {
  const [tweets, setTweets] = useState<TweetFragmentFragment[]>([]);
  const [saveLoading, setLoading] = useState<boolean>(false);
  const [label, setLabel] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);
  const [getTweet, { data }] = useGetTweetMutation();
  const { data: meData } = useMeQuery();
  const [addTweets] = useAddTweetsMutation({
    update: (cache) => {
      const data: any = cache.readQuery({
        query: GetMyTweetsDocument,
      })!;

      if (data) {
        cache.writeQuery({
          query: GetMyTweetsDocument,
          data: { getMyTweets: [...data.getMyTweets, ...tweets] },
        });
      }
    },
  });
  const clickHandler = (id: number) => {
    setTweets((prev) => {
      const idx = prev.findIndex((tweet) => tweet.id === id);

      return [...prev.slice(0, idx), ...prev.slice(idx + 1)];
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
      setTweets([]);
      setLoading(true);
      setLoading(false);
      setLabel("Tweets saved successfully");
      setTimeout(() => {
        setLabel("");
      }, 3000);
      const tweetURLs: string[] = tweets.map((tweet) => tweet.url!);
      await addTweets({
        variables: { urls: tweetURLs },
        optimisticResponse: { addTweets: true },
      });
    } else {
      alert("Please add tweets");
    }
  };
  return (
    <>
      <Navbar />
      <div className="p-20">
        <br />
        {label && <h1 className="text-center mb-2">{label}</h1>}
        <div className="flex flex-row  space-x-4 justify-center">
          <div>
            <Input
              size="md"
              className="mb-2 w-60"
              placeholder="Tweet URL"
              aria-label="Tweet URL"
              ref={inputRef}
            />
          </div>
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
        {tweets.length > 0 && !saveLoading && meData && meData.me && (
          <Button onClick={saveHandler} size="lg" className="w-80 m-auto">
            Save
          </Button>
        )}

        <Managetweets />
      </div>

      <br />
    </>
  );
};

export default Dashboard;
