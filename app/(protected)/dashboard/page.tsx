"use server";
import NameAndAvatar from "@/app/components/account/NameAndAvatar";
import Status from "@/app/components/account/Status";
import ExpBar from "@/app/components/account/ExpBar";
import Quote from "@/app/components/account/Quote";
import { signOut } from "@/auth";
import { currentUser } from "@/lib/auth";
import { getUserById } from "@/data/user";
import { User } from "@prisma/client";

export default async function Home() {
  const user = await currentUser();
  const details = await getUserById(user?.id as string);
  const { name, level, exp, expGap, proPoints, loserPoints, image } =
    details as User;
  return (
    <>
      <div className="w-[90vw] max-w-[800px] mx-auto pt-10 flex justify-end items-center">
        <form
          action={async () => {
            "use server";
            await signOut();
          }}
        >
          <button
            type="submit"
            className="w-28 h-10 px-2 text-sm font-normal bg-primary text-secondary rounded-xl"
          >
            Logout
          </button>
        </form>
      </div>
      <NameAndAvatar name={name} image={image} />
      <Status label="Level" amount={level} />
      <ExpBar exp={exp} expGap={expGap} />
      <Status label="Pro Points" amount={proPoints} />
      <Status label="Loser Points" amount={loserPoints} />
      <Quote />
    </>
  );
}
