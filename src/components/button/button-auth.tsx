import React from "react";
import { Button } from "../ui/button";
import { Session } from "next-auth";
import Link from "next/link";
import ButtonLogout from "./button-logout";

type Props = {
  session: Session | null;
};

const ButtonAuth = ({ session }: Props) => {
  return session ? (
    <ButtonLogout />
  ) : (
    <Link href={"/signin"}>
      <Button variant="secondary" size="lg" type="button">
        Login
      </Button>
    </Link>
  );
};

export default ButtonAuth;
