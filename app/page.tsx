import Image from "next/image";
import NameAndAvatar from "./components/account/NameAndAvatar";
import Status from "./components/account/Status";
import ExpBar from "./components/account/ExpBar";
import Quote from "./components/account/Quote";

export default function Home() {
  return (
    <>
      <div className="w-full pt-10 pr-5 flex justify-end items-center">
        <button className="w-28 h-10 px-2 text-sm font-normal bg-main text-primary rounded-xl">
          Edit Profile
        </button>
      </div>
      <NameAndAvatar />
      <Status label="Level" amount={2} />
      <ExpBar />
      <Status label="Pro Points" amount={0} />
      <Status label="Loser Points" amount={225} />
      <Quote />
    </>
  );
}
