import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useCreateUserMutation } from "../generated/graphql";

interface cbProps {}
const Cb: React.FC<cbProps> = ({}) => {
  const router = useRouter();
  const code = router.query.code as string;
  const [createUser] = useCreateUserMutation({
    variables: { code },
  });
  useEffect(() => {
    const initUser = async () => {
      const user = await createUser();
    };
    if (code) {
      initUser();
      router.push("/?login=success");
    }
  }, [code, createUser]);

  return <div></div>;
};

export default Cb;
