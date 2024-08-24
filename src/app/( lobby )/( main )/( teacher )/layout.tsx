import LayoutTeacher from "@/layouts/teacher/layout-teacher";
import { ReactNode } from "react";

const layout = ({ children }: { children: ReactNode }) => {
  return <LayoutTeacher>{children}</LayoutTeacher>;
};

export default layout;
