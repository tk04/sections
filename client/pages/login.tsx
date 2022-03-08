import React, { useRef } from "react";
import { Button } from "@nextui-org/react";
import { Input } from "@nextui-org/react";
import { useRouter } from "next/router";
interface indexProps {}

import Googlebutton from "../components/GoogleButton";
import Twitterbutton from "../components/TwitterButton";
import { UserInput, useSignUpMutation } from "../generated/graphql";

const Index: React.FC<indexProps> = ({}) => {
  const router = useRouter();
  const [createUser] = useSignUpMutation();

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const signUpHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const name = nameRef.current!.value;
    const email = emailRef.current!.value;
    const password = passwordRef.current!.value;
    if (!name || !email || !password) {
      alert("Please fill all the fields");
    } else if (password.length < 8) {
      alert("Password must be at least 8 characters long");
    } else if (!email.includes("@") || !email.includes(".")) {
      alert("Please enter a valid email");
    } else if (name.length <= 1) {
      alert("Name input must be at least 2 characters long");
    } else {
      const user = await createUser({
        variables: { input: { name, email, password } as UserInput },
      });
      router.push("/?login=success");
    }
  };
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <form
        className="-ml-5 flex flex-col space-y-3 w-72"
        onSubmit={signUpHandler}
      >
        <section className="flex flex-col">
          <label htmlFor="name">Name:</label>
          <Input id="react-aria6355502326-35" aria-label="name" ref={nameRef} />
        </section>
        <section className="flex flex-col">
          <label htmlFor="email">Email:</label>
          <Input
            id="react-aria6355502326-39"
            aria-label="email"
            ref={emailRef}
          />
        </section>
        <section className="flex flex-col">
          <label htmlFor="password">Password:</label>
          <Input.Password
            id="react-aria6355502326-43"
            aria-label="password"
            ref={passwordRef}
          />
        </section>
        <Button>Signup</Button>
      </form>
      <br />
      <div className="space-y-2">
        <Googlebutton />
        <Twitterbutton />
      </div>
    </div>
  );
};

export default Index;
