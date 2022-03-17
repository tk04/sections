import React, { useEffect } from "react";

import { useRouter } from "next/router";
import { useTwitterAuthMutation } from "../generated/graphql";
import { setToken } from "../utils/setCookie";
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
        setToken(data.signInWithTwitter.token!);
        router.push("/?login=success");
      }
    }
  }, [code, twitterAuth, router]);
  return <div>TWITTER LOGIN</div>;
};

export default TwitterCb;
