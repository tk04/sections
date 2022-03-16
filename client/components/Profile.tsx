import { Button, Input } from "@nextui-org/react";
import Image from "next/image";
import React, { useRef } from "react";
import {
  MeDocument,
  useMeQuery,
  UserResponse,
  useUpdateMeMutation,
} from "../generated/graphql";
import TSVG from "../public/TwitterLogo.svg";
import Googlesvg from "./GoogleSVG";
interface profileProps {
  onSave: () => void;
}

const Profile: React.FC<profileProps> = ({ onSave }) => {
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const { data } = useMeQuery();
  const [updateMe] = useUpdateMeMutation({
    update(cache, { data: { updateMe } }: any) {
      const { me } = cache.readQuery({ query: MeDocument }) as {
        me: UserResponse;
      };
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
      optimisticResponse: {
        __typename: "Mutation",
        updateMe: {
          __typename: "FullUser",
          twitter: data!.me!.twitter,
          google: data!.me!.google,
          picture: data!.me!.picture,
          id: data!.me!.id,
          ...input,
        },
      },
    });
    onSave();
  };
  return (
    <div className="flex flex-color w-full h-full  justify-center py-5">
      {/* <h1>Profile</h1> */}
      {/* <Card shadow={false} className="w-fit"> */}
      <div className="flex flex-col items-center space-y-2">
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
        <label className="self-start ml-2">Name:</label>
        <Input
          initialValue={data?.me?.name}
          ref={nameRef}
          size="lg"
          className="w-64"
        />
        <label className="self-start ml-2">Email:</label>
        <Input
          size="lg"
          initialValue={data?.me?.email || ""}
          ref={emailRef}
          className="w-64"
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
        <Button onClick={saveHandler} light bordered size="lg">
          Save
        </Button>
      </div>
      {/* </Card> */}
    </div>
  );
};

export default Profile;
