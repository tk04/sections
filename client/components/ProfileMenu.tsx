import { Button, Modal } from "@nextui-org/react";
import Link from "next/link";
import React, { useState } from "react";
import Profile from "./Profile";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
interface ProfileMenuProps {}

const Profilemenu: React.FC<ProfileMenuProps> = ({}) => {
  const router = useRouter();
  const [visible, setVisible] = useState(false);
  const handler = () => setVisible(true);
  const closeHandler = () => {
    setVisible(false);
  };
  return (
    <div>
      <div className="flex flex-col justify-center items-center">
        <Button light onClick={handler}>
          Profile
        </Button>
        <Modal
          closeButton
          blur
          aria-labelledby="modal-title"
          open={visible}
          onClose={closeHandler}
        >
          <Profile onSave={closeHandler} />
        </Modal>
        <Link href="/dashboard">
          <Button bordered light>
            Dashboard
          </Button>
        </Link>
        <Button
          bordered
          light
          color="error"
          className="mt-2"
          onClick={() => {
            Cookies.remove("token");
            router.push("/");
            // router.reload();
            // client.cache.evict({
            //   fieldName: "me",
            //   args: { token: Cookies.get("token") },
            // });
            // client.cache.gc();
          }}
        >
          Logout
        </Button>
      </div>
    </div>
  );
};

export default Profilemenu;
