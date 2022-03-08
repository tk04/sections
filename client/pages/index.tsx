import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useMeQuery } from "../generated/graphql";
import { useRouter } from "next/router";
import Navbar from "../components/NavBar";
import Twitterbutton from "../components/TwitterButton";
import Googlebutton from "../components/GoogleButton";
import { Button } from "@nextui-org/react";
import Signupmodal from "../components/SignupModal";
import { useSignup } from "../hooks/useSignup";
interface indexProps {}

const Index: React.FC<indexProps> = ({}) => {
  const { data, refetch } = useMeQuery();
  const { visibleSignup, SignupHandler, closeSignupHandler } = useSignup();
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
    <>
      <Navbar />
      <div className="mx-20 ml-64 grid grid-cols-[30%_70%] grid-flow-col-dense h-[80vh]">
        <article className="flex flex-col justify-center ">
          <h1 className=" text-7xl font-bold">
            Make your website <br />
            stand out
          </h1>
          <br />
          <p className="w-96">
            Customise your site with plugin with custom designed section
            components in less than 20 seconds. Choose from the wide range of
            sections we provide and paste the URL into your website.
          </p>
          <Button
            className="mt-4 text-lg py-6 w-full rounded-none"
            onClick={SignupHandler}
          >
            Get started
          </Button>
          <Signupmodal open={visibleSignup} close={closeSignupHandler} />
          <section className="mt-5 flex flex-col justify-center w-full items-center space-y-4">
            <Twitterbutton />
            <Googlebutton />
          </section>
        </article>
        <article>
          <div></div>
        </article>
      </div>
    </>
  );
};

export default Index;
