import React from "react";

interface indexProps {}

import Googlebutton from "../components/GoogleButton";
import Twitterbutton from "../components/TwitterButton";

const Index: React.FC<indexProps> = ({}) => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="space-y-2">
        <Googlebutton />
        <Twitterbutton />
      </div>
    </div>
  );
};

export default Index;
