import React, { useEffect } from "react";

import { useRouter } from "next/router";
import { useTwitterAuthMutation } from "../generated/graphql";
interface twitter_cbProps {}

const TwitterCb: React.FC<twitter_cbProps> = ({}) => {
  const [twitterAuth] = useTwitterAuthMutation();
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
      router.push("/?login=success");
    }
  }, [code, twitterAuth, router]);
  return <div>TWITTER LOGIN</div>;
};

export default TwitterCb;
