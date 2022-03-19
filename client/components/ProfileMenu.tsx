import { Button, Modal } from "@nextui-org/react";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import Profile from "./Profile";
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
            // work on logout mutation
            router.push("/");
          }}
        >
          Logout
        </Button>
      </div>
    </div>
  );
};

export default Profilemenu;
