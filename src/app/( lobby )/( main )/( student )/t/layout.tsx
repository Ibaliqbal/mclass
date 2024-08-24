import LayoutStudent from "@/layouts/student/layout-student";
import React, { ReactNode } from "react";

const layout = ({ children }: { children: ReactNode }) => {
  return <LayoutStudent>{children}</LayoutStudent>;
};

export default layout;
