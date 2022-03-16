import { Card, Input } from "@nextui-org/react";
import React from "react";
import Navbar from "../components/NavBar";
import { useMeQuery } from "../generated/graphql";
import Image from "next/image";
interface profileProps {}

const Profile: React.FC<profileProps> = ({}) => {
  const { data } = useMeQuery();
  return (
    <>
      <Navbar />
      <div className="px-56 py-20">
        <h1>Profile</h1>
        <Card shadow={false} className="w-fit">
          <div className="flex flex-col">
            {data?.me?.picture && (
              <Image
                src={data.me.picture!}
                width={60}
                height={60}
                className="rounded-full"
                layout="fixed"
                alt=""
              />
            )}
            <Input label="Name" initialValue={data?.me?.name} />
            <Input label="Email" initialValue={data?.me?.email || ""} />
            {/* add twitter and google connections */}
            <p>
              {/* Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Pellentesque euismod, urna eu tincidunt consectetur, nisi nunc
            pretium nunc, eget efficitur nisl nunc euismod nunc. Pellentesque
            euismod, urna eu tincidunt consectetur, nisi nunc pretium nunc, eget
            efficitur nisl nunc euismod nunc. */}
            </p>
          </div>
        </Card>
      </div>
    </>
  );
};

export default Profile;
