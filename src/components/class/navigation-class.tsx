"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const NavigationClass = ({
  code,
  role,
}: {
  code: string;
  role: "Teacher" | "Student";
}) => {
  const pathname = usePathname();
  return (
    <nav className="mt-4 flex gap-4 items-center md:text-lg text-sm">
      <Link
        href={`/c/${code}`}
        className={`${
          pathname === `/c/${code}`
            ? "border-b border-gray-500 dark:border-slate-300"
            : ""
        } pb-2`}
      >
        Forum
      </Link>
      {role === "Student" ? (
        <Link
          href={`/c/${code}/task_class`}
          className={`${
            pathname === `/c/${code}/task_class`
              ? "border-b border-gray-500 dark:border-slate-300"
              : ""
          } pb-2`}
        >
          Task Class
        </Link>
      ) : null}
      <Link
        href={`/c/${code}/people`}
        className={`${
          pathname === `/c/${code}/people`
            ? "border-b border-gray-500 dark:border-slate-300"
            : ""
        } pb-2`}
      >
        People
      </Link>
    </nav>
  );
};

export default NavigationClass;
