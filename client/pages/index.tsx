import React, { useEffect } from "react";
import Image from "next/image";
import { useMeQuery } from "../generated/graphql";
import { useRouter } from "next/router";
interface indexProps {}

const Index: React.FC<indexProps> = ({}) => {
  const { data, refetch } = useMeQuery();

  const router = useRouter();
  const LoginSuccess = router.query.login;
  useEffect(() => {
    if (LoginSuccess === "success") {
      router.push("/");
      setTimeout(() => {
        refetch();
      }, 700);
    }
  });

  return (
    <div>
      {data && data.me && (
        <>
          <h1>HELLo</h1>
          <h1>Name: {data?.me.name}</h1>
          <h1>Email: {data?.me.email}</h1>
          {data.me.picture && (
            <Image
              src={`${data.me.picture}`}
              alt="user pic"
              width={100}
              height={100}
            />
          )}
        </>
      )}
    </div>
  );
};

export default Index;
