import React from "react";
import NavItem from "@/app/components/navigation/NavItem";
import { RouteType } from "@/types/globalTypes";
import { Inter } from "next/font/google";
import { Meteors } from "@/app/components/ui/metors";

const inter = Inter({ subsets: ["latin"] });
const appLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="w-screen h-[80vh] max-h-[80vh] overflow-y-scroll absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] xl:overflow-x-hidden ">
      {children}
    </div>
  );
};

export default appLayout;
