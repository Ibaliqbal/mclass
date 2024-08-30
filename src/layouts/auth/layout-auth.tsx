"use client";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";

const LayoutAuth = ({
  children,
  type,
  role,
  textMore,
}: {
  children: ReactNode;
  type: "signin" | "register";
  role: "teacher" | "student";
  textMore: string;
}) => {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 0, translateY: type === "register" ? 60 : -60 }}
        animate={{ opacity: 1, translateY: 0 }}
        exit={{ opacity: 0, translateY: type === "register" ? -60 : 60 }}
        transition={{ duration: 0.3 }}
        key={type}
        className="h-full lg:w-full w-[80%] py-3 grid place-items-center"
      >
        <div className="flex flex-col gap-4 w-full">
          {children}
          <div className="items-center justify-center flex ">
            <div className="flex flex-col gap-4 items-center w-fit">
              <p>
                {textMore}{" "}
                <Link
                  href={`/${type}${type === "register" ? `/${role}` : ""}`}
                  className="text-blue-600"
                >
                  here
                </Link>
              </p>
              <Separator />
              {type === "signin" ? (
                <p>
                  Register as{" "}
                  <Link
                    href={`/register/${
                      role === "student" ? "teacher" : "student"
                    }`}
                    className="text-blue-600"
                  >
                    {role === "student" ? "Teacher" : "Student"}
                  </Link>
                </p>
              ) : null}
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default LayoutAuth;
