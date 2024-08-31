import React from "react";
import Link from "next/link";
import ButtonAuth from "../button/button-auth";
import { auth } from "@/lib/auth";

const NavbarHome = async () => {
  const session = await auth();
  return (
    <nav className="w-full px-4 py-5 flex justify-between items-center sticky top-0 z-[50] bg-white/55 dark:bg-[#121212]/55 backdrop-blur-md">
      <h1 className="italic text-xl font-bold">
        <Link href={"/"}>MCLASS</Link>
      </h1>
      <div className="flex gap-4 items-center">
        <Link
          href={"/about-us"}
          className="hover:underline hover:underline-offset-4"
        >
          About us
        </Link>
        <ButtonAuth session={session} />
      </div>
    </nav>
  );
};

export default NavbarHome;
