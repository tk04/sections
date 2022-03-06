import React from "react";
import { useRouter } from "next/router";
interface cbProps {}
const Cb: React.FC<cbProps> = ({}) => {
  const router = useRouter();
  console.log(router.query);
  return (
    <div>
      <h1>Callback Screen</h1>
    </div>
  );
};

export default Cb;
