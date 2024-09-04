import NavbarHome from "@/components/navbar/navbar-home";
import Sidebar from "@/layouts/side/sidebar";
import { ReactNode } from "react";

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <main>
      <NavbarHome />
      <section className="lg:grid lg:grid-cols-5 lg:gap-4 w-full px-4 mt-4">
        <Sidebar />
        <main className="lg:col-span-4 pb-10">
          {children}
        </main>
      </section>
    </main>
  );
};

export default layout;
