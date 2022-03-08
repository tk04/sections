import { useState } from "react";

export const useSignup = () => {
  const [visibleSignup, setVisibleSignup] = useState<boolean>(false);
  const SignupHandler = () => setVisibleSignup(true);
  const closeSignupHandler = () => {
    setVisibleSignup(false);
  };

  return {
    visibleSignup,
    SignupHandler,
    closeSignupHandler,
  };
};
