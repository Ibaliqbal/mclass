"use client";
import React from "react";
import { motion } from "framer-motion";

const CardTask = ({ index }: { index: number }) => {
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
      className="py-3 px-2 w-full flex justify-between items-center"
    >
      <div>
        <h3 className="text-lg font-bold">Task Title</h3>
        <p className="text-gray-600">Tanggal: 20 Maret 2020</p>
      </div>
      <p className="text-lg text-red-600">Belum Diserahkan</p>
    </motion.article>
  );
};

export default CardTask;
