import React from "react";
import { Button } from "@nextui-org/react";
import Googlesvg from "./GoogleSVG";

interface GoogleButtonProps {}

const Googlebutton: React.FC<GoogleButtonProps> = ({}) => {
  const handleLogin = () => {
    window.location.href = process.env.GOOGLE_URI!;
  };
  return (
    <Button
      size="lg"
      light
      color="primary"
      className="flex align-middle items-center border-2 border-gray-100 w-72 justify-center -ml-5 rounded-2xl h-11 hover:cursor-pointer"
      onClick={handleLogin}
    >
      <Googlesvg />
      <h1 className="text-black font-medium">Login with Google</h1>
    </Button>
  );
};

export default Googlebutton;
