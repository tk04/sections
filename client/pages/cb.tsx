import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useCreateUserMutation } from "../generated/graphql";
import { setToken } from "../utils/setCookie";

interface cbProps {}
const Cb: React.FC<cbProps> = ({}) => {
  const router = useRouter();
  const code = router.query.code as string;
  const [createUser, { data }] = useCreateUserMutation({
    variables: { code },
  });
  useEffect(() => {
    const initUser = async () => {
      const user = await createUser();
    };
    if (code) {
      initUser();
      if (data?.signInWithGoogle.__typename === "FullUser") {
        setToken(data.signInWithGoogle.token!);
        router.push("/?login=success");
      }
    }
  }, [code, createUser, router]);

  return <div></div>;
};

export default Cb;
