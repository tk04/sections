import { Button, Modal } from "@nextui-org/react";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { MeDocument, useLogoutMutation } from "../generated/graphql";
import Profile from "./Profile";
interface ProfileMenuProps {}

const Profilemenu: React.FC<ProfileMenuProps> = ({}) => {
  const router = useRouter();
  const [visible, setVisible] = useState(false);
  const [logout, { data }] = useLogoutMutation({
    update: (cache) => {
      cache.writeQuery({
        query: MeDocument,
        data: {
          me: null,
        },
      });
    },
  });
  const handler = () => setVisible(true);
  const closeHandler = () => {
    setVisible(false);
  };
  const logoutHandler = () => {
    logout({
      optimisticResponse: {
        logout: true,
      },
    });
    router.push("/");
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
          onClick={logoutHandler}
        >
          Logout
        </Button>
      </div>
    </div>
  );
};

export default Profilemenu;
