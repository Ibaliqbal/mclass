"use client";
import React from "react";
import { MdOutlineQuiz } from "react-icons/md";
import { SlBookOpen } from "react-icons/sl";
import { HiOutlineDotsVertical, HiLink } from "react-icons/hi";
import { motion } from "framer-motion";
import Link from "next/link";

const CardSubjectMatter = ({ index }: { index: number }) => {
  return (
    <motion.article
      initial={{ opacity: 0, scale: 0.3, transformOrigin: "bottom left" }}
      animate={{ opacity: 1, scale: 1, transformOrigin: "bottom left" }}
      transition={{
        ease: "circInOut",
        duration: 0.6,
        delay: 0.2 * index,
        type: "tween",
      }}
      className="px-5 py-4 w-full flex justify-between items-center border-[1px] border-gray-300 rounded-md"
    >
      <Link
        href="/c/340sAss/s/jahihi10-1919"
        className="flex items-center gap-4"
      >
        <div className="p-4 bg-sky-500 rounded-full">
          <MdOutlineQuiz className="text-2xl text-white" />
        </div>
        <div>
          <h2 className="text-lg">Tugas Baru untuk materi Pembalajaran ke 5</h2>
          <p className="text-gray-500 dark:text-gray-300 text-sm">
            3 Januari 2020
          </p>
        </div>
      </Link>
      <div className="relative group w-fit">
        <HiOutlineDotsVertical className="text-2xl cursor-pointer" />
        <div className="bg-white rounded-md p-3 flex flex-col opacity-0 group-hover:opacity-100 transition-all duration-300 ease-in-out gap-3 absolute right-3 top-3 text-nowrap dark:text-black">
          <p className="flex items-center gap-2 cursor-pointer">
            <HiLink />
            Share Link
          </p>
        </div>
      </div>
    </motion.article>
  );
};

export default CardSubjectMatter;
