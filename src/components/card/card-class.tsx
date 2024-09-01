"use client";
import React from "react";
import { Avatar, AvatarImage } from "../ui/avatar";
import { FaFolderOpen } from "react-icons/fa6";
import { Separator } from "../ui/separator";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { TClass } from "@/lib/db/schema";

type Props = Pick<TClass, "code" | "className" | "header_photo" | "subject"> & {
  instructor: {
    name: string;
    avatar: string | null;
  };
  i: number;
};

const CardClass = ({
  i,
  className,
  code,
  header_photo,
  instructor,
  subject,
}: Props) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        type: "tween",
        delay: 0.2 * Math.round(Math.random() * 5),
        duration: 0.5,
        ease: "circInOut",
      }}
      className="pb-3 rounded-lg border-[1px] border-gray-500"
    >
      <Image
        src={header_photo ? header_photo : "/header_4.jpeg"}
        width={200}
        height={200}
        className="object-cover object-center w-full aspect-[1/.4] rounded-t-lg"
        alt="Header_photo"
      />
      <div className="pl-3 px-2">
        <Avatar className="w-20 h-20 -mt-14 mb-4">
          <AvatarImage
            src={
              instructor.avatar
                ? instructor.avatar
                : `https://ui-avatars.com/api/?name=${instructor.name}&background=random&color=#000`
            }
            width={100}
            height={100}
            alt="Avatar"
            className="object-cover object-center"
          />
        </Avatar>
        <Link href={`/c/${code}`}>
          <h1 className="text-xl font-semibold hover:underline hover:underline-offset-4 line-clamp-1">
            {className}
          </h1>
          <h4 className="hover:underline hover:underline-offset-4 line-clamp-1">
            {subject}
          </h4>
          <p className="hover:underline hover:underline-offset-4 line-clamp-1">
            {instructor.name}
          </p>
        </Link>
        <Separator className="mt-3" />
        <Link href={`/c/${code}/t`}>
          <FaFolderOpen className="text-lg mt-3 cursor-pointer" />
        </Link>
      </div>
    </motion.div>
  );
};

export default CardClass;
