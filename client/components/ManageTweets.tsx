import React, { useEffect, useState } from "react";
import {
  GetTweetsDocument,
  TweetFragmentFragment,
  useDeleteTweetMutation,
  useGetMyTweetsQuery,
} from "../generated/graphql";
import Tweets from "./Tweets";
interface ManageTweetsProps {}

const Managetweets: React.FC<ManageTweetsProps> = ({}) => {
  const [deleted, setDeleted] = useState<boolean>(false);
  const { data } = useGetMyTweetsQuery();
  const [deleteTweet] = useDeleteTweetMutation({
    update: (cache, { data }) => {
      const results: any = cache.readQuery({ query: GetTweetsDocument });
      if (results) {
        // const values =
        const idx = results.getTweets.findIndex(
          (tweet: any) => tweet.url === data?.deleteTweet
        );

        cache.writeQuery({
          query: GetTweetsDocument,
          data: {
            getTweets: [
              ...results.getTweets.slice(0, idx),
              ...results.getTweets.slice(idx + 1),
            ],
          },
        });
      }
    },
  });
  const [tweets, setTweets] = useState<TweetFragmentFragment[]>([]);
  useEffect(() => {
    if (data) {
      console.log("SETTING TWEETS");
      setTweets(data.getMyTweets);
    }
  }, [data]);
  const clickHandler = async (id: number, url: string) => {
    if (url) {
      setDeleted(true);
      setTimeout(() => {
        setDeleted(false);
      }, 3000);
      // setTweets((prev) => {
      // const idx = prev.findIndex((tweet) => tweet.id === id);

      // return [...prev.slice(0, idx), ...prev.slice(idx + 1)];
      // });
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
