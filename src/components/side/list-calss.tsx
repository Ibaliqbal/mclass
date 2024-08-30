"use client";
import { SiGoogleclassroom } from "react-icons/si";
import { LuBookMarked } from "react-icons/lu";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";
import { Session } from "next-auth";
import { useQuery } from "@tanstack/react-query";
import { classService } from "@/services/class";

const ListClass = ({ session }: { session: Session | null }) => {
  const { isLoading, data } = useQuery({
    queryKey: ["list", "class"],
    queryFn: async () => (await classService.get()).data?.classes,
  });
  return (
    <Accordion collapsible type="single" className="px-3">
      <AccordionItem value="list-classroom">
        <AccordionTrigger>
          <p className="flex items-center gap-3 font-semibold">
            <SiGoogleclassroom className="text-2xl" /> Classroom
          </p>
        </AccordionTrigger>
        <AccordionContent>
          {isLoading ? (
            <div className="w-full min-h-[200px] flex justify-center items-center">
              <div className="loader" />
            </div>
          ) : (
            <div className="w-full flex flex-col gap-3">
              {session?.user.role === "Student" ? (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{
                    duration: 0.5,
                    ease: "easeInOut",
                    type: "tween",
                  }}
                >
                  <Link
                    href={"/t/missing/all"}
                    className="flex items-center gap-3 py-2 border border-gray-500 rounded-lg pl-2 group text-lg"
                  >
                    <LuBookMarked /> List Tasks
                  </Link>
                </motion.div>
              ) : null}
              {Array.from({ length: 10 }).map((_, i) => (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{
                    duration: 0.5,
                    ease: "easeInOut",
                    type: "tween",
                    delay: i * 0.1,
                  }}
                  key={i}
                >
                  <Link
                    href={"/c/340sAss"}
                    className="flex items-center gap-3 py-2 border border-gray-500 rounded-lg pl-2 group"
                  >
                    <Image
                      src={"/avatar.jpg"}
                      alt="Avatar"
                      width={100}
                      height={100}
                      className="object-cover object-center w-[40px] h-[40px] rounded-full"
                    />
                    <div>
                      <h1 className="line-clamp-1 text-md font-semibold group-hover:underline underline-offset-2">
                        PRE_XII EI 2
                      </h1>
                      <p className="line-clamp-1 text-xs group-hover:underline underline-offset-2">
                        Tika Setiawati
                      </p>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default ListClass;
