import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  CreateUserMutation,
  CreateUserMutationResult,
  useCreateUserMutation,
} from "../generated/graphql";
import Image from "next/image";
interface cbProps {}
const Cb: React.FC<cbProps> = ({}) => {
  const router = useRouter();
  const [datau, setDatau] = useState<any>();
  const code = router.query.code as string;
  const [createUser, { loading, error }] = useCreateUserMutation({
    variables: { code },
  });
  useEffect(() => {
    const initUser = async () => {
      const user = await createUser();
      console.log("USER: ", user);
      setDatau(user);
    };
    if (code) {
      initUser();
    }
  }, [code, createUser]);
  console.log("DATA USER: ", datau);
  return (
    <div>
      {datau && (
        <>
          <h1>HELLo</h1>
          <h1>Name: {datau?.data.signUp.name}</h1>
          <h1>Email: {datau?.data.signUp.email}</h1>
          <Image
            src={`${datau?.data.signUp.picture}`}
            alt="user pic"
            width={100}
            height={100}
          />
        </>
      )}

      <h1>Callback Screen</h1>
    </div>
  );
};

export default Cb;
