"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const NavigationTask = ({ code }: { code: string }) => {
  const pathname = usePathname();
  return (
    <nav className="mt-4 flex gap-4 items-center md:text-lg text-sm">
      <Link
        href={`/t/missing/${code}`}
        className={`${
          pathname === `/t/missing/${code}`
            ? "border-b border-gray-500 dark:border-slate-300"
            : ""
        } pb-2`}
      >
        Belum Diserahkan
      </Link>
      <Link
        href={`/t/not-turned-in/${code}`}
        className={`${
          pathname === `/t/not-turned-in/${code}`
            ? "border-b border-gray-500 dark:border-slate-300"
            : ""
        } pb-2`}
      >
        Ditugaskan
      </Link>
      <Link
        href={`/t/turned-in/${code}`}
        className={`${
          pathname === `/t/turned-in/${code}`
            ? "border-b border-gray-500 dark:border-slate-300"
            : ""
        } pb-2`}
      >
        Selesai
      </Link>
    </nav>
  );
};

export default NavigationTask;
