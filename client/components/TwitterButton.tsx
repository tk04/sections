import React from "react";
import TSVG from "../public/TwitterLogo.svg";
interface TwitterButtonProps {}
import Image from "next/image";
const Twitterbutton: React.FC<TwitterButtonProps> = ({}) => {
  const twitterLogin = () => {
    window.location.href = process.env.TWITTER_URI!;
  };
  return (
    <div
      className="flex align-middle items-center border-[2px] border-gray-100 w-60 justify-center -ml-5 rounded-2xl h-11 hover:cursor-pointer space-x-3"
      onClick={twitterLogin}
    >
      <Image src={TSVG} width={30} height={30} alt="" />
      <h1>Login with Twitter</h1>
    </div>
  );
};

export default Twitterbutton;
