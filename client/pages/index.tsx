import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { useMeQuery } from "../generated/graphql";
interface indexProps {}
import Image from "next/image";

const Index: React.FC<indexProps> = ({}) => {
  const { data, loading, refetch } = useMeQuery();
  const router = useRouter();
  const LoginSuccess = router.query.login;
  useEffect(() => {
    if (LoginSuccess === "success") {
      router.push("/");
      setTimeout(() => {
        refetch();
      }, 500);
    }
  }, [LoginSuccess, router, refetch]);
  const handleLogin = () => {
    window.location.href = process.env.GOOGLE_URI!;
  };
  return (
    <div>
      {data && data.me ? (
        <>
          <h1>HELLo</h1>
          <h1>Name: {data?.me.name}</h1>
          <h1>Email: {data?.me.email}</h1>
          <Image
            src={`${data.me.picture}`}
            alt="user pic"
            width={100}
            height={100}
          />
        </>
      ) : (
        <button onClick={handleLogin}>Sign in with google</button>
      )}
    </div>
  );
};

export default Index;
