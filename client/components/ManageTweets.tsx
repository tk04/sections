import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import {
  GetMyTweetsDocument,
  TweetFragmentFragment,
  useDeleteTweetMutation,
  useGetMyTweetsQuery,
} from "../generated/graphql";
import Tweets from "./Tweets";
interface ManageTweetsProps {}

const Managetweets: React.FC<ManageTweetsProps> = ({}) => {
  const [deleted, setDeleted] = useState<boolean>(false);
  const { data } = useGetMyTweetsQuery({
    variables: { token: Cookies.get("token")! },
  });
  const [deleteTweet] = useDeleteTweetMutation({
    // variables: { },
    update: (cache, { data }) => {
      const results: any = cache.readQuery({
        query: GetMyTweetsDocument,
        variables: { token: Cookies.get("token")! },
      });
      console.log("RESULTS: ", results);
      if (results.getMyTweets) {
        // const values =
        const idx = results.getMyTweets.findIndex(
          (tweet: any) => tweet.url === data?.deleteTweet
        );

        cache.writeQuery({
          query: GetMyTweetsDocument,
          variables: { token: Cookies.get("token")! },
          data: {
            getMyTweets: [
              ...results.getMyTweets.slice(0, idx),
              ...results.getMyTweets.slice(idx + 1),
            ],
          },
        });
      }
    },
  });
  const [tweets, setTweets] = useState<TweetFragmentFragment[]>([]);
  useEffect(() => {
    if (data) {
      setTweets(data.getMyTweets);
    }
  }, [data]);
  const clickHandler = async (id: number, url: string) => {
    if (url) {
      setDeleted(true);
      setTimeout(() => {
        setDeleted(false);
      }, 3000);

      await deleteTweet({
        variables: { url, token: Cookies.get("token")! },
        optimisticResponse: { deleteTweet: url },
      });
    }
  };
  return (
    <div>
      <h1 className="m-auto w-fit mt-10 mb-5 text-xl ">
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
