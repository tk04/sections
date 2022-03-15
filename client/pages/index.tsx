import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useMeQuery } from "../generated/graphql";
import { useRouter } from "next/router";
import Navbar from "../components/NavBar";
import Twitterbutton from "../components/TwitterButton";
import Googlebutton from "../components/GoogleButton";
import { Button } from "@nextui-org/react";
import Signupmodal from "../components/SignupModal";
import { useSignup } from "../hooks/useSignup";
import IframeResizer from "iframe-resizer-react";
import Script from "next/script";

interface indexProps {}

const Index: React.FC<indexProps> = ({}) => {
  const iframeRef = useRef<any>(null);
  const [messageData, setMessageData] = useState();

  const onResized = (data: any) => setMessageData(data);

  const onMessage = (data: any) => {
    setMessageData(data);
    iframeRef.current!.sendMessage("Hello back from the parent page");
  };

  const tweetRef = useRef<HTMLIFrameElement>(null);
  const { refetch } = useMeQuery();
  const { visibleSignup, SignupHandler, closeSignupHandler } = useSignup();
  const router = useRouter();
  const LoginSuccess = router.query.login;
  useEffect(() => {
    if (LoginSuccess === "success") {
      router.push("/");
      setTimeout(() => {
        refetch();
      }, 1000);
    }
  });
  function resizeIframe() {
    console.log(
      tweetRef.current!.contentWindow!.document.body.scrollHeight + "px"
    );
    console.log(tweetRef.current!.contentWindow!.document.body.scrollHeight);
  }

  return (
    <>
      <Navbar />j
      <div className="mx-20 ml-64 grid grid-cols-[30%_70%] grid-flow-col-dense h-[90vh] ">
        <article className="flex flex-col justify-center h-[80vh]">
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
            shadow
            size="xl"
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
      <div className="w-fit font-extrabold text-3xl m-auto ">
        Customized Sections
      </div>
      <br />
      <IframeResizer
        forwardRef={iframeRef}
        heightCalculationMethod="lowestElement"
        inPageLinks
        // log
        onMessage={onMessage}
        onResized={onResized}
        src="http://localhost:3000/tweets"
        style={{ width: "1px", minWidth: "100%" }}
      />
    </>
  );
};

export default Index;
