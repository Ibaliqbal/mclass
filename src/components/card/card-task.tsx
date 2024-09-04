"use client";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";

type Props = {
  index: number;
  title: string;
  status: "missing" | "assigned" | "done";
  code: string;
  id: string;
  createdAt: string;
};

const CardTask = ({ index, status, code, createdAt, id, title }: Props) => {
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
    >
      <Link
        href={`/c/${code}/s/${id}`}
        className="py-3 px-2 w-full flex justify-between items-center"
      >
        <div>
          <h3 className="md:text-lg text-sm font-bold line-clamp-1">{title}</h3>
          <p className="text-gray-600 md:text-sm text-xs">
            Tanggal: {createdAt}
          </p>
        </div>
        <p
          className={`md:text-lg text-xs ${
            status === "missing"
              ? "text-red-600"
              : status === "assigned"
              ? "text-green-500"
              : ""
          }`}
        >
          {status === "missing"
            ? "Belum Diserahkan"
            : status === "assigned"
            ? "Ditugaskan"
            : "Diserahkan"}
        </p>
      </Link>
    </motion.article>
  );
};

export default CardTask;
