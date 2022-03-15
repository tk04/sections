import React, { useEffect, useState } from "react";
import {
  TweetFragmentFragment,
  useDeleteTweetMutation,
  useGetTweetsQuery,
} from "../generated/graphql";
import Tweets from "./tweets";

interface ManageTweetsProps {
  refresh: boolean;
}

const Managetweets: React.FC<ManageTweetsProps> = ({ refresh }) => {
  const [deleted, setDeleted] = useState<boolean>(false);
  const { data, refetch } = useGetTweetsQuery();
  const [deleteTweet] = useDeleteTweetMutation();
  const [tweets, setTweets] = useState<TweetFragmentFragment[]>([]);
  useEffect(() => {
    if (data) {
      setTweets(data.getTweets);
    }
    if (refresh) {
      refetch();
    }
  }, [data, refresh, refetch]);
  const clickHandler = async (id: number, url: string) => {
    if (url) {
      setDeleted(true);
      setTimeout(() => {
        setDeleted(false);
      }, 3000);
      setTweets((prev) => {
        return prev.filter((tweet) => tweet.id !== id);
      });
      await deleteTweet({ variables: { url } });
    }
  };
  return (
    <div>
      <h1 className="m-auto w-fit mt-10 mb-5">
        Manage current tweets (click to delete tweet)
      </h1>
      {deleted && <p className="w-fit m-auto">Tweet deleted successfully</p>}
      <br />
      {tweets.length > 0 && (
        <>
          <Tweets tweets={tweets} clickEvent={clickHandler} />
        </>
      )}
    </div>
  );
};

export default Managetweets;
