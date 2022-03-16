import { Button, Modal } from "@nextui-org/react";
import React, { useState } from "react";
import Link from "next/link";
import Profile from "./Profile";

interface ProfileMenuProps {}

const Profilemenu: React.FC<ProfileMenuProps> = ({}) => {
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
        <Button bordered light>
          <Link href="/dashboard">Dashboard</Link>
        </Button>
      </div>
    </div>
  );
};

export default Profilemenu;
