import React from "react";
import Link from "next/link";
import ButtonAuth from "../button/button-auth";
import { auth } from "@/lib/auth";
import NavbarMobile from "./navbar-mobile";

const NavbarHome = async () => {
  const session = await auth();
  return (
    <nav className="w-full px-4 py-5 flex justify-between items-center sticky top-0 z-[50] bg-white/55 dark:bg-[#121212]/55 backdrop-blur-md">
      <div className="flex items-center gap-2">
        <NavbarMobile session={session} />
        <h1 className="italic text-xl font-bold">
          <Link href={"/"}>MCLASS</Link>
        </h1>
      </div>
      <ButtonAuth session={session} />
    </nav>
  );
};

export default NavbarHome;
