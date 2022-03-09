import { Modal } from "@nextui-org/react";
import React, { useState } from "react";
import Signup from "./Signup";

interface SignupModalProps {
  open: boolean;
  close: () => void;
}

const Signupmodal: React.FC<SignupModalProps> = ({ open, close }) => {
  return (
    <Modal
      closeButton
      aria-labelledby="modal-title"
      open={open}
      onClose={close}
    >
      <Signup />
    </Modal>
  );
};

export default Signupmodal;
