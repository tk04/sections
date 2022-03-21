import Editor from "@monaco-editor/react";
import { Button, Modal } from "@nextui-org/react";
import React, { useState } from "react";
import { AiFillCheckCircle } from "react-icons/ai";
import { VscCopy } from "react-icons/vsc";
import { useMeQuery } from "../generated/graphql";

interface TweetsLinkProps {}

const Tweetslink: React.FC<TweetsLinkProps> = ({}) => {
  const [open, setOpen] = useState(false);
  const [copy, setCopy] = useState(false);

  const { data } = useMeQuery();
  let copyContent = `<script src="https://sections1.vercel.app/iframeResizer.js"></script>
  <iframe id="tweetWall" style="min-width: 100%" frameborder="0" 
  src="https://sections1.vercel.app/tweets/${data?.me?.id}"></iframe>
  <script>
      iFrameResize({ log: false }, "#tweetWall");
  </script>
      `;

  const openHandler = () => {
    setOpen(true);
  };
  const closeHandler = () => {
    setOpen(false);
  };
  const copyHandler = () => {
    navigator.clipboard.writeText(copyContent);
    setCopy(true);
    setTimeout(() => {
      setCopy(false);
    }, 5000);
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
        <div className="flex justify-center space-x-4 items-center">
          {copy ? (
            <AiFillCheckCircle size={25} className="justify-self-start" />
          ) : (
            <VscCopy
              size={25}
              onClick={copyHandler}
              className="justify-self-start"
            />
          )}
          <h1 className="z-10 w-fit h-full font-bold ">Embed the code below</h1>
        </div>

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
            defaultValue={copyContent}
          />
        )}
      </Modal>
    </div>
  );
};

export default Tweetslink;
