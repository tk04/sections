import React from "react";
import { useRouter } from "next/router";
interface twitter_cbProps {}

const TwitterCb: React.FC<twitter_cbProps> = ({}) => {
  const router = useRouter();
  console.log("QUERY: ", router.query);
  return <div>TWITTER LOGIN</div>;
};

export default TwitterCb;
