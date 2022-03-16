import {
  Avatar,
  Button,
  Checkbox,
  Input,
  Modal,
  Row,
  Text,
} from "@nextui-org/react";
import Link from "next/link";
import React, { useState } from "react";
import { useMeQuery } from "../generated/graphql";
import { useRouter } from "next/router";
import handler from "../pages/api/hello";
import Login from "./Login";
import Signup from "./Signup";
import Signupmodal from "./SignupModal";
import { useSignup } from "../hooks/useSignup";
interface NavBarProps {}

const Navbar: React.FC<NavBarProps> = ({}) => {
  const router = useRouter();

  const { data } = useMeQuery();
  return (
    <nav className="flex mt-14 font-md font-bold lg:mx-10 2xl:mx-64 mx-10  items-center justify-between">
      <ul className=" cursor-pointer">
        <Link href="/">
          <li>Sections</li>
        </Link>
      </ul>
      {!data?.me && (
        <ul className="lg:flex lg:space-x-14 xl:space-x-20 lg  mx-auto hidden">
          <li>Home</li>
          <li>Features</li>
          <li>Pricing</li>
          <li>About</li>
        </ul>
      )}

      {data && data.me ? (
        <Button
          auto
          light
          size="md"
          className="cursor-pointer"
          onClick={() => router.push("/profile")}
        >
          {data.me.picture && (
            <Avatar
              size="md"
              src={data?.me.picture}
              color="primary"
              className="cursor-pointer"
              bordered
              squared
            />
          )}
          <h1 className="ml-2">{data?.me.name}</h1>
        </Button>
      ) : (
        <section className="flex items-center space-x-6 cursor-pointer ">
          <Button light auto onClick={() => router.push("/login")}>
            Login
          </Button>

          <Button
            auto
            className="py-3 px-10 font-bold"
            onClick={() => router.push("/signup")}
          >
            Signup <span className="pl-2 font-light"> --it&apos;s free</span>
          </Button>
        </section>
      )}
    </nav>
  );
};

export default Navbar;
