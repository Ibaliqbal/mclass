import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";

const NavbarHome = () => {
  return (
    <nav className="w-full px-4 py-5 flex justify-between items-center">
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
        <Link href={"/signin/student"}>
          <Button variant="secondary">Login</Button>
        </Link>
      </div>
    </nav>
  );
};

export default NavbarHome;
