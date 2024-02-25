"use client";
import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";
import React, { useState } from "react";
import { isatty } from "tty";

const NavItem = ({
  seg,
  href,
  children,
}: {
  seg: string | null;
  href: string;
  children: React.ReactNode;
}) => {
  const segment = useSelectedLayoutSegment();
  const isActive = seg === segment;
  return (
    <Link
      href={href}
      className={`text-base w-[7em] p-2 text-center ${
        isActive
          ? "font-bold text-main border-b-2 border-b-main"
          : "font-normal text-primary"
      }`}
    >
      {children}
    </Link>
  );
};

export default NavItem;
