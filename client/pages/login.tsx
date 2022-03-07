import React from "react";
import { Button } from "@nextui-org/react";
import { Input } from "@nextui-org/react";

interface indexProps {}

import Googlebutton from "../components/GoogleButton";
import Twitterbutton from "../components/TwitterButton";

const Index: React.FC<indexProps> = ({}) => {
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <form className="-ml-5 flex flex-col space-y-3 w-72">
        <section className="flex flex-col">
          <label htmlFor="fname">Name:</label>
          <Input aria-label="Enter name here" />
        </section>
        <section className="flex flex-col">
          <label htmlFor="email">Email:</label>
          <Input aria-label="Enter email here" />
        </section>
        <section className="flex flex-col">
          <label htmlFor="password">Password:</label>
          <Input.Password aria-label="Enter password here" />
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
