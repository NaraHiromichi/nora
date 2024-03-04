import React from "react";
import NavItem from "../components/navigation/NavItem";
import { RouteType } from "@/types/globalTypes";
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });
const appLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const routes: RouteType[] = [
    { title: "Players", href: "/players", seg: "players" },
    { title: "Home", href: "/dashboard", seg: "dashboard" },
    { title: "Play", href: "/play", seg: "play" },
  ];
  return (
    <>
      <main className="w-screen h-[90vh]">{children}</main>
      <nav className="w-[90vw] h-[10vh] mx-auto flex justify-around items-center">
        {routes.map((route: RouteType) => {
          return (
            <NavItem href={route.href} key={route.href} seg={route.seg}>
              {route.title}
            </NavItem>
          );
        })}
      </nav>
    </>
  );
};

export default appLayout;
