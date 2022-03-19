import { Avatar, Button, Tooltip } from "@nextui-org/react";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { useMeQuery } from "../generated/graphql";
import Profilemenu from "./ProfileMenu";
interface NavBarProps {}

const Navbar: React.FC<NavBarProps> = ({}) => {
  const router = useRouter();

  const { data } = useMeQuery();

  return (
    <nav className=" flex mt-14  xs:mb-24 mb-12 font-md font-bold lg:mx-52 2xl:mx-72 mx-10  items-center justify-between align-middle">
      <ul className="mt-2 cursor-pointer">
        <Link href="/">
          <li>Sections</li>
        </Link>
      </ul>

      {data && data.me ? (
        <Tooltip
          content={<Profilemenu />}
          trigger="click"
          placement="leftEnd"
          className="flex items-center"
        >
          {data.me.picture && (
            <Avatar
              // size="md"
              src={data?.me.picture}
              color="primary"
              className="cursor-pointer"
              bordered
              squared
            />
          )}
          <h1 className="ml-2">{data?.me.name}</h1>
        </Tooltip>
      ) : (
        <section className="flex items-center space-x-6 cursor-pointer ">
          <Button light auto onClick={() => router.push("/login")}>
            Login
          </Button>

          <Button
            auto
            light
            bordered
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
