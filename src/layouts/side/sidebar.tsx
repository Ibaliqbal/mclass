import ButtonCraeteClass from "@/components/button/button-create-class";
import ButtonJoinClass from "@/components/button/button-join-class";
import LinkActive from "@/components/side/link-active";
import ListClass from "@/components/side/list-class";
import { Calendar } from "@/components/ui/calendar";
import { Separator } from "@/components/ui/separator";
import { auth } from "@/lib/auth";
import Link from "next/link";
import React from "react";
import {
  IoHomeOutline,
  IoHome,
  IoSettingsOutline,
  IoSettings,
} from "react-icons/io5";

const Sidebar = async () => {
  const session = await auth();

  return (
    <aside className="col-span-1 lg:flex py-4 hidden flex-col gap-4">
      <LinkActive
        className="text-lg flex items-center gap-3 font-semibold px-3"
        href="/"
        text="Home"
        active={<IoHome className="text-2xl" />}
        nonActive={<IoHomeOutline className="text-2xl" />}
      />
      {session ? (
        <>
          <Separator />
          <ListClass session={session} />
          <Separator />{" "}
          <LinkActive
            href="/settings"
            className="text-lg flex items-center gap-3 font-semibold px-3"
            text="Settings"
            active={<IoSettings className="text-2xl" />}
            nonActive={<IoSettingsOutline className="text-2xl" />}
          />
        </>
      ) : null}

      {session ? (
        session.user.role === "Teacher" ? (
          <ButtonCraeteClass />
        ) : (
          <ButtonJoinClass />
        )
      ) : null}
      <div className="flex flex-col items-center px-3 w-full">
        <Calendar />
        <p className="text-center text-xs">
          <span className="text-sm bg-green-300 dark:bg-gradient-to-br from-emerald-300 to-green-500 px-2 py-1 dark:text-slate-700 font-semibold mx-[2px]">
            ⌛ Waktu
          </span>{" "}
          itu cepat banget, jangan sampai kita buang-buang{" "}
          <span className="text-sm bg-green-300 dark:bg-gradient-to-br from-emerald-300 to-green-500 px-2 py-1 dark:text-slate-700 font-semibold mx-[2px]">
            waktu
          </span>{" "}
          ya! 🎓
        </p>
      </div>
      <p className="text-center text-wrap text-sm">
        Inspiration design{" "}
        <Link
          href={"https://classroom.google.com/"}
          className="text-blue-600 hover:underline"
          target="_blank"
        >
          Google Classroom
        </Link>
      </p>
    </aside>
  );
};

export default Sidebar;
