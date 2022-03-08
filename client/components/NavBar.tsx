import { Avatar, Button } from "@nextui-org/react";
import Link from "next/link";
import React from "react";
import { useMeQuery } from "../generated/graphql";
import { useRouter } from "next/router";
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
      <ul className="lg:flex lg:space-x-14 xl:space-x-20 lg  mx-auto hidden">
        <li>Home</li>
        <li>Features</li>
        <li>Pricing</li>
        <li>About</li>
      </ul>

      {data && data.me ? (
        <Button auto light size="md" onClick={() => router.push("/profile")}>
          {data.me.picture && (
            <Avatar
              size="md"
              src={data?.me.picture}
              color="primary"
              bordered
              squared
            />
          )}
          <h1 className="ml-2">{data?.me.name}</h1>
        </Button>
      ) : (
        <section className="flex items-center space-x-6 cursor-pointer ">
          <Link href="/login">
            <h1 className="bg-slate-100 font-semibold py-3 px-5">Login</h1>
          </Link>
          <Link href="/signup">
            <h1 className="bg-sky-600 py-3 text-white  px-6">
              Get started <span className=" font-light">--it&apos;s free</span>
            </h1>
          </Link>
        </section>
      )}
    </nav>
  );
};

export default Navbar;
