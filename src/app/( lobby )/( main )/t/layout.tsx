import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import React, { ReactNode } from "react";

const layout = async ({ children }: { children: ReactNode }) => {
  const session = auth();

  if (!session) return redirect("/");

  return children;
};

export default layout;
