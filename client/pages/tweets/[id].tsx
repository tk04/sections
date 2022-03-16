import { useRouter } from "next/router";
import Script from "next/script";
import React from "react";
import Tweets from "../../components/Tweets";
import { useGetTweetsQuery } from "../../generated/graphql";
interface tweetProps {}

const Tweet: React.FC<tweetProps> = ({}) => {
  const router = useRouter();
  const id: string | null = router.query.id as string;
  console.log("id: ", id);
  const { data } = useGetTweetsQuery({
    variables: { id: id },
    skip: !id,
  });

  return (
    <div>
      <Script src="/iframeResize.js" strategy="beforeInteractive" />
      {data && data.getTweets && (
        <>
          <Tweets tweets={data.getTweets} />
        </>
      )}
    </div>
  );
};

export default Tweet;
