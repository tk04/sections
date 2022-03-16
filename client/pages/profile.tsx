import { Button, Card, Input } from "@nextui-org/react";
import React, { useRef } from "react";
import Navbar from "../components/NavBar";
import {
  MeDocument,
  useMeQuery,
  UserResponse,
  useUpdateMeMutation,
} from "../generated/graphql";
import Image from "next/image";
import TSVG from "../public/TwitterLogo.svg";
import Googlesvg from "../components/GoogleSVG";
import { off } from "process";
interface profileProps {}

const Profile: React.FC<profileProps> = ({}) => {
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const { data } = useMeQuery();
  const [updateMe] = useUpdateMeMutation({
    update(cache, { data: { updateMe } }: any) {
      const { me } = cache.readQuery({ query: MeDocument }) as {
        me: UserResponse;
      };
      // console.log("NEW DATA: ", updateMe);
      if (updateMe?.__typename == "FullUser") {
        cache.writeQuery({
          query: MeDocument,
          data: { me: updateMe },
        });
      }
    },
  });
  const saveHandler = async () => {
    if (!nameRef.current || !emailRef.current) {
      alert("Please fill all the fields");
      return;
    }
    if (emailRef.current!.value && !emailRef.current!.value.includes("@")) {
      alert("Please enter a valid email");
      return;
    }
    if (nameRef.current!.value.trim().length <= 1) {
      alert("Name must be greater than 2 characters");
      return;
    }
    const input = {
      email: emailRef.current!.value,
      name: nameRef.current!.value,
    };
    await updateMe({
      variables: { input },
    });
  };
  return (
    <>
      <Navbar />
      <div className="px-56 py-20">
        <h1>Profile</h1>
        <Card shadow={false} className="w-fit">
          <div className="flex flex-col items-center">
            {data?.me?.picture && (
              <Image
                src={data.me.picture!}
                width={60}
                height={60}
                className="rounded-full w-full"
                layout="fixed"
                alt=""
              />
            )}
            <Input label="Name" initialValue={data?.me?.name} ref={nameRef} />
            <Input
              label="Email"
              initialValue={data?.me?.email || ""}
              ref={emailRef}
            />
            <p className="text-gray-400 my-2">Connected accounts</p>
            {data?.me?.google && (
              <section className="-ml-2 flex items-center justify-center">
                <Googlesvg />
                <p>Google</p>
              </section>
            )}
            {data?.me?.twitter && (
              <section className="flex items-center space-x-2 justify-center">
                <Image src={TSVG} width={24} height={24} alt="" />
                <p>Twitter</p>
              </section>
            )}
            <br />
            <Button onClick={saveHandler}>Save</Button>
          </div>
        </Card>
      </div>
    </>
  );
};

export default Profile;
