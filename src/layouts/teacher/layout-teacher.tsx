import { ComponentPropsWithoutRef, ReactNode } from "react";
import SidebarTeacher from "../side/sidebar-teacher";
import { cn } from "@/lib/utils";

const LayoutTeacher = ({
  children,
  className,
  ...rest
}: { children: ReactNode } & ComponentPropsWithoutRef<"main">) => {
  return (
    <div className="grid grid-cols-5 gap-4 w-full px-4 mt-4">
      <SidebarTeacher />
      <main className={cn("col-span-4 pb-10", className)}>{children}</main>
    </div>
  );
};

export default LayoutTeacher;
