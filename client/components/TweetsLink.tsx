import Link from "next/link";
import React from "react";
import { useMeQuery } from "../generated/graphql";

interface TweetsLinkProps {}

const Tweetslink: React.FC<TweetsLinkProps> = ({}) => {
  const { data } = useMeQuery();
  return (
    <div className="w-fit m-auto">
      <h1>Embed link</h1>

      {data && data.me && (
        <div>
          <Link href={`http://localhost:3000/tweets/${data.me.id}`}>
            Show wall of tweets
          </Link>
        </div>
      )}
    </div>
  );
};

export default Tweetslink;
