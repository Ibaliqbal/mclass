import NavbarHome from "@/components/navbar/navbar-home";
import Sidebar from "@/layouts/side/sidebar";
import { ReactNode } from "react";

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <main>
      <NavbarHome />
      <section className="grid grid-cols-5 gap-4 w-full px-4 mt-4">
        <Sidebar />
        <main className="col-span-4 pb-10">
          {children}
        </main>
      </section>
    </main>
  );
};

export default layout;
