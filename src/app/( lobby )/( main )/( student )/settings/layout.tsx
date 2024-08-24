import Sidebar from "@/layouts/side/sidebar";
import { ReactNode } from "react";

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="grid grid-cols-5 gap-4 w-full px-4 mt-4">
      <Sidebar />
      <main className="col-span-4 pb-10">{children}</main>
    </div>
  );
};

export default layout;
