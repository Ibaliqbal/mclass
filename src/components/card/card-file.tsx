"use client";
import React from "react";
import { FaFilePdf } from "react-icons/fa6";
import { motion } from "framer-motion";
import {
  BsFiletypeDocx,
  BsFiletypePptx,
  BsDownload,
  BsFiletypeXlsx,
  BsFiletypeJpg,
  BsFiletypePng,
} from "react-icons/bs";
import { IoIosClose } from "react-icons/io";
import Image from "next/image";

type Props = {
  index: number;
  icon: "download" | "delete";
  type: "image" | "pdf" | "docx" | "xlsx" | "pptx";
};

const CardFile = ({ index, icon, type = "pdf" }: Props) => {
  return type === "image" ? (
    <motion.figure
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        duration: 0.5,
        delay: 0.2 * index,
        ease: "circInOut",
        type: "tween",
      }}
      className="flex group flex-col hover:scale-95 transition-transform duration-300 ease-linear relative p-3 border cursor-pointer border-gray-500 gap-3 rounded-md items-center w-full h-[120px]"
    >
      <Image
        src="https://utfs.io/f/5cff206a-6f14-4e42-b6bc-5eb72db2e121-axpbv2.jpeg"
        alt="Luffy"
        fill
        loading="lazy"
        sizes="100%"
        className="object-cover object-center w-full h-full rounded-md"
      />
      <div className="group-hover:opacity-100 transition-opacity duration-300 ease-linear opacity-0 absolute inset-0 w-full h-full bg-black bg-opacity-70 grid place-items-center">
        {icon === "download" ? (
          <BsDownload className="text-2xl text-white font-bold" />
        ) : (
          <IoIosClose className="text-2xl text-white font-bold" />
        )}
      </div>
    </motion.figure>
  ) : (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        duration: 0.5,
        delay: 0.2 * index,
        ease: "circInOut",
        type: "tween",
      }}
      className="flex group flex-col hover:scale-95 transition-transform duration-300 ease-linear relative p-3 border cursor-pointer border-gray-500 gap-3 rounded-md items-center justify-center"
    >
      <div className="w-full flex justify-center">
        <FaFilePdf className="text-6xl" />
      </div>
      <h4 className="text-sm text-gray-400 line-clamp-2 text-center">
        Sample.pdf
      </h4>
      <div className="group-hover:opacity-100 transition-opacity duration-300 ease-linear opacity-0 absolute inset-0 w-full h-full bg-black bg-opacity-70 grid place-items-center">
        {icon === "download" ? (
          <BsDownload className="text-2xl text-white font-bold" />
        ) : (
          <IoIosClose className="text-3xl text-white font-bold" />
        )}
      </div>
    </motion.div>
  );
};

export default CardFile;
