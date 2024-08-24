import React, { ComponentPropsWithoutRef, ReactNode } from "react";
import Sidebar from "../side/sidebar";
import { cn } from "@/lib/utils";

const LayoutStudent = ({
  children,
  className,
  ...rest
}: { children: ReactNode } & ComponentPropsWithoutRef<"main">) => {
  return (
    <div className="grid grid-cols-5 gap-4 w-full px-4 mt-4">
      <Sidebar />
      <main className={cn("col-span-4 pb-10", className)}>{children}</main>
    </div>
  );
};

export default LayoutStudent;
