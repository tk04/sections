import React, { useRef } from "react";
import { Button } from "@nextui-org/react";
import { Input } from "@nextui-org/react";
import { useRouter } from "next/router";
import Googlebutton from "../components/GoogleButton";
import Twitterbutton from "../components/TwitterButton";
import { useLoginMutation, LoginInput } from "../generated/graphql";
interface loginProps {}

const Login: React.FC<loginProps> = ({}) => {
  const router = useRouter();
  const [loginUser, { data }] = useLoginMutation();

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const signUpHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const email = emailRef.current!.value;
    const password = passwordRef.current!.value;
    if (!email || !password) {
      alert("Please fill all the fields");
    } else if (password.length < 8) {
      alert("Password must be at least 8 characters long");
    } else if (!email.includes("@") || !email.includes(".")) {
      alert("Please enter a valid email");
    } else {
      const user = await loginUser({
        variables: { input: { email, password } as LoginInput },
      });
      if (user.data?.login.__typename === "FullUser") {
        router.push("/?login=success");
      }
    }
  };
  return (
    <div className="flex flex-col justify-center items-center my-10">
      <form className=" flex flex-col space-y-3 w-72" onSubmit={signUpHandler}>
        <section className="flex flex-col">
          <label className="text-left" htmlFor="email">
            Email:
          </label>
          <Input
            id="react-aria6355502326-39"
            aria-label="email"
            ref={emailRef}
          />
        </section>
        <section className="flex flex-col">
          <label htmlFor="password" className="text-left">
            Password:
          </label>
          <Input.Password
            id="react-aria6355502326-43"
            aria-label="password"
            ref={passwordRef}
          />
        </section>
        <Button>Login</Button>
      </form>
      {data?.login.__typename === "UserError" && (
        <p className="text-red-500 mr-5 font-semibold text-md mt-2">
          Could not Login with entered credentials
        </p>
      )}
      <br />
      <div className="space-y-2">
        <Googlebutton />
        <Twitterbutton />
      </div>
    </div>
  );
};

export default Login;
