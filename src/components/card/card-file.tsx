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

type Props = {
  index: number;
};

const CardFile = ({ index }: Props) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        duration: 0.5,
        delay: 0.2 * index,
        ease: "circInOut",
        type: "tween",
      }}
      className="flex group flex-col relative p-3 border cursor-pointer border-gray-500 gap-3 rounded-md items-center"
    >
      <div className="w-full flex justify-center">
        <FaFilePdf className="text-6xl" />
      </div>
      <h4 className="text-sm text-gray-400 line-clamp-2 text-center">
        Sample.pdf
      </h4>
      <div className="group-hover:opacity-100 transition-opacity duration-300 ease-linear opacity-0 absolute inset-0 w-full h-full bg-black bg-opacity-70 grid place-items-center">
        <BsDownload className="text-2xl text-white font-bold" />
      </div>
    </motion.div>
  );
};

export default CardFile;
