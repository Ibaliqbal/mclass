"use client";
import React from "react";
import { Avatar, AvatarImage } from "../ui/avatar";
import { FaFolderOpen } from "react-icons/fa6";
import { Separator } from "../ui/separator";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

const CardClass = ({ i }: { i: number }) => {
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
        src={"/header_4.jpeg"}
        width={200}
        height={200}
        className="object-cover object-center w-full aspect-[1/.4] rounded-t-lg"
        alt="Header_photo"
      />
      <div className="pl-3 px-2">
        <Avatar className="w-20 h-20 -mt-14">
          <AvatarImage
            src="/avatar.jpg"
            width={100}
            height={100}
            alt="Avatar"
            className="object-cover object-center"
          />
        </Avatar>
        <Link href={"/c/340sAss"} className="mt-3">
          <h1 className="text-xl font-semibold hover:underline hover:underline-offset-4 line-clamp-1">
            PRE_XII EI2
          </h1>
          <h4 className="hover:underline hover:underline-offset-4 line-clamp-1">
            JAM KE 1 - JAM KE 6
          </h4>
          <p className="hover:underline hover:underline-offset-4 line-clamp-1">
            Tike Setiawati
          </p>
          <Separator className="mt-3" />
          <FaFolderOpen className="text-lg mt-3 cursor-pointer" />
        </Link>
      </div>
    </motion.div>
  );
};

export default CardClass;
