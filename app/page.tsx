"use client";
import { useRouter } from "next/navigation";
import { TypewriterEffect } from "@/app/components/ui/typewriter-effect";

const page = () => {
  const router = useRouter();
  const words = [
    {
      text: "Boost",
      className: "text-white",
    },
    {
      text: "your",
      className: "text-white",
    },
    {
      text: "maths",
      className: "text-white",
    },
    {
      text: "skill",
      className: "text-white",
    },
    {
      text: "with",
      className: "text-white",
    },
    {
      text: "Nora.",
      className: "text-blue-500 dark:text-blue-500",
    },
  ];
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-grid-white/[0.2]">
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center bg-black [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
      <p className="text-neutral-200 text-base mb-10">
        The road to wisdom starts from here
      </p>
      <TypewriterEffect words={words} />
      <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 space-x-0 md:space-x-4 mt-10">
        <button
          onClick={() => router.push("/auth/sign-up")}
          className="w-40 h-10 rounded-xl bg-black border border-white border-transparent text-white text-sm"
        >
          Join now
        </button>
        <button
          onClick={() => router.push("/auth/sign-in")}
          className="w-40 h-10 rounded-xl bg-white text-black border border-black  text-sm"
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default page;
