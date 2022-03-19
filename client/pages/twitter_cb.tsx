import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useTwitterAuthMutation } from "../generated/graphql";

interface twitter_cbProps {}

const TwitterCb: React.FC<twitter_cbProps> = ({}) => {
  const [twitterAuth, { data }] = useTwitterAuthMutation();
  const router = useRouter();
  const code = router.query.code;

  useEffect(() => {
    const auth = async (code: string) => {
      await twitterAuth({
        variables: { code },
      });
    };
    if (code) {
      auth(code as string);
      if (data?.signInWithTwitter.__typename === "FullUser") {
        router.push("/?login=success");
      }
    }
  }, [code, twitterAuth, router, data]);

  return <div></div>;
};

export default TwitterCb;
