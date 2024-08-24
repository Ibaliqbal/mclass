import NavbarHome from "@/components/navbar/navbar-home";
import { ReactNode } from "react";

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <main className="h-[200dvh]">
      <NavbarHome />
      {children}
    </main>
  );
};

export default layout;
