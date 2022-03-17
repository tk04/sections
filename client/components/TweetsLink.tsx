import { Button, Modal } from "@nextui-org/react";

import React, { useState } from "react";
import { useMeQuery } from "../generated/graphql";
import Editor from "@monaco-editor/react";
import Cookies from "js-cookie";
interface TweetsLinkProps {}

const Tweetslink: React.FC<TweetsLinkProps> = ({}) => {
  const [open, setOpen] = useState(false);

  const { data } = useMeQuery({ variables: { token: Cookies.get("token")! } });
  const openHandler = () => {
    setOpen(true);
  };
  const closeHandler = () => {
    setOpen(false);
  };
  return (
    <div className="w-fit m-auto">
      <Button onClick={openHandler}>Embed link</Button>
      <Modal
        width="700px"
        className="bg-white"
        closeButton
        aria-labelledby="modal-title"
        open={open}
        onClose={closeHandler}
      >
        <h1 className="z-10 w-full h-full font-bold ">Embed the code below </h1>

        <br />
        {data && data.me && (
          <Editor
            height="120px"
            options={{
              readOnly: true,
              minimap: {
                enabled: false,
              },

              scrollBarVisibility: 2,
              theme: "light",
            }}
            width="700px"
            defaultLanguage="html"
            defaultValue={`<script src="https://sections1.vercel.app/iframeResizer.js"></script>
  <iframe id="tweetWall" style="min-width: 100%" frameborder="0" 
  src="https://sections1.vercel.app/tweets/${data?.me?.id}"></iframe>
  <script>
      iFrameResize({ log: false }, "#tweetWall");
  </script>
      `}
          />
        )}
      </Modal>
    </div>
  );
};

export default Tweetslink;
