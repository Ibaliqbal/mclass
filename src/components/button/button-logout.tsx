import React from "react";
import { Button } from "../ui/button";
import { redirect } from "next/navigation";
import { signOut } from "@/lib/auth";

const ButtonLogout = () => {
  return (
    <form
      action={async () => {
        "use server";
        await signOut();
        redirect("/");
      }}
    >
      <Button variant="logout" size="lg" type="submit">
        Logout
      </Button>
    </form>
  );
};

export default ButtonLogout;
