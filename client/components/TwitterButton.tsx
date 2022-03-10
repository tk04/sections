import React from "react";
import TSVG from "../public/TwitterLogo.svg";
import { Button } from "@nextui-org/react";

interface TwitterButtonProps {}
import Image from "next/image";
const Twitterbutton: React.FC<TwitterButtonProps> = ({}) => {
  const twitterLogin = () => {
    window.location.href = process.env.TWITTER_URI!;
  };
  return (
    <Button
      light
      size="lg"
      // auto
      color="primary"
      className="flex space-x-10 align-middle items-center border-[2px] border-gray-100 w-72 justify-center -ml-4 rounded-2xl h-11 hover:cursor-pointer"
      onClick={twitterLogin}
    >
      <Image src={TSVG} width={26} height={26} alt="" />
      <h1 className="pl-2 text-black font-medium">Login with Twitter</h1>
    </Button>
  );
};

export default Twitterbutton;
