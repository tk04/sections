import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useCreateUserMutation } from "../generated/graphql";

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
        router.push("/?login=success");
      }
    }
  }, [code, createUser, router, data]);

  return <div></div>;
};

export default Cb;
