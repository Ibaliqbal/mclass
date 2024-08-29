import React from "react";
import { Button } from "../ui/button";
import { Session } from "next-auth";
import Link from "next/link";
import { signOut } from "@/lib/auth";

type Props = {
  session: Session | null;
};

const ButtonAuth = ({ session }: Props) => {
  return session ? (
    <form
      action={async () => {
        "use server";
        await signOut();
      }}
    >
      <Button variant="logout" size="lg" type="submit">
        Logout
      </Button>
    </form>
  ) : (
    <Link href={"/signin/student"}>
      <Button variant="secondary" size="lg" type="button">
        Login
      </Button>
    </Link>
  );
};

export default ButtonAuth;
