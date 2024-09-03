"use client";
import React from "react";
import { FaFilePdf } from "react-icons/fa6";
import { motion } from "framer-motion";
import {
  BsFiletypeDocx,
  BsFiletypePptx,
  BsDownload,
  BsFiletypeXlsx,
  BsFiletypeMp4,
} from "react-icons/bs";
import Image from "next/image";
import { Files } from "@/types/task";
import toast from "react-hot-toast";

type Props = {
  index: number;
  withIcon: boolean;
} & Files;

const CardFile = ({ index, withIcon, type, url, name }: Props) => {
  const handleClick = async (urlFile: string, nameFile: string) => {
    try {
      const res = await fetch(urlFile);
      if (!res.ok) throw new Error("Could not download this file");
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = nameFile || "download"; // Nama file untuk diunduh
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "An unexpected error occurred";

      toast.error(errorMessage);
    } finally {
      toast.success("Download complete");
    }
  };

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
        src={url}
        alt={name}
        fill
        loading="lazy"
        sizes="100%"
        className="object-cover object-center w-full h-full rounded-md"
      />
      {withIcon ? (
        <div className="group-hover:opacity-100 transition-opacity duration-300 ease-linear opacity-0 absolute inset-0 w-full h-full bg-black bg-opacity-70 grid place-items-center">
          <BsDownload
            className="text-2xl text-white font-bold"
            onClick={() => handleClick(url, name)}
          />
        </div>
      ) : null}
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
        {type === "pdf" ? (
          <FaFilePdf className="text-6xl" />
        ) : type === "docx" ? (
          <BsFiletypeDocx className="text-6xl" />
        ) : type === "pptx" ? (
          <BsFiletypePptx className="text-6xl" />
        ) : type === "video" ? (
          <BsFiletypeMp4 className="text-6xl" />
        ) : (
          <BsFiletypeXlsx className="text-6xl" />
        )}
      </div>
      <h4 className="text-sm text-gray-400 line-clamp-2 text-wrap max-w-full overflow-hidden text-center">
        {name}
      </h4>
      {withIcon ? (
        <div className="group-hover:opacity-100 transition-opacity duration-300 ease-linear opacity-0 absolute inset-0 w-full h-full bg-black bg-opacity-70 grid place-items-center">
          <BsDownload
            className="text-2xl text-white font-bold"
            onClick={() => handleClick(url, name)}
          />
        </div>
      ) : null}
    </motion.div>
  );
};

export default CardFile;
