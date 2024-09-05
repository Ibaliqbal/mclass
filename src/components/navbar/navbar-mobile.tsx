"use client";
import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Session } from "next-auth";
import LinkActive from "../side/link-active";
import {
  IoHome,
  IoHomeOutline,
  IoSettings,
  IoSettingsOutline,
} from "react-icons/io5";
import { Separator } from "../ui/separator";
import ListClass from "../side/list-class";
import ButtonCraeteClass from "../button/button-create-class";
import ButtonJoinClass from "../button/button-join-class";
import { Calendar } from "../ui/calendar";
import ButtonHamburger from "../button/button-humberger";
import Link from "next/link";

const NavbarMobile = ({ session }: { session: Session | null }) => {
  const [openSide, setOpenSide] = React.useState(false);
  return (
    <div className="lg:hidden">
      <ButtonHamburger open={openSide} setOpen={setOpenSide} />
      <AnimatePresence mode="sync">
        {openSide && (
          <section className="w-[100%] h-dvh bg-black bg-opacity-40 absolute top-0 right-0 flex items-center justify-end">
            <motion.aside
              initial={{ translateX: -500 }}
              animate={{ translateX: 0 }}
              exit={{ translateX: -500 }}
              transition={{
                duration: 0.6,
                ease: "easeIn",
                type: "tween",
              }}
              className="md:w-[75%] w-full max-h-full overflow-x-auto h-full flex px-5 z-40 py-6 flex-col gap-4 dark:bg-black bg-white custom-horizontal-scroll"
            >
              <ButtonHamburger
                open={openSide}
                setOpen={setOpenSide}
                className="mb-5"
              />
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
                  <Separator />
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
            </motion.aside>
          </section>
        )}
      </AnimatePresence>
    </div>
  );
};

export default NavbarMobile;
