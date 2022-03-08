import React, { useEffect } from "react";
import Image from "next/image";
import { useMeQuery } from "../generated/graphql";
import { useRouter } from "next/router";
import Navbar from "../components/NavBar";
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
      }, 900);
    }
  });

  return (
    <div>
      <Navbar />
    </div>
  );
};

export default Index;
