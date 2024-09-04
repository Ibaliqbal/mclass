"use client";
import React from "react";
import { MdOutlineQuiz } from "react-icons/md";
import { SlBookOpen } from "react-icons/sl";
import { HiOutlineDotsVertical, HiLink, HiTrash } from "react-icons/hi";
import { motion } from "framer-motion";
import Link from "next/link";
import { TSubmission } from "@/lib/db/schema";
import { format } from "date-fns";
import toast from "react-hot-toast";
import { AxiosError } from "axios";
import { taskService } from "@/services/task";

type Props = Pick<
  TSubmission,
  "createdAt" | "id" | "title" | "type" | "updatedAt"
> & {
  code: string;
  index: number;
};

const CardSubjectMatter = ({
  index,
  code,
  createdAt,
  id,
  title,
  type,
  updatedAt,
}: Props) => {
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
      <Link href={`/c/${code}/s/${id}`} className="flex items-center gap-4">
        <div className="p-4 bg-sky-500 rounded-full">
          {type !== "material" && type !== "presence" ? (
            <MdOutlineQuiz className="md:text-2xl text-xl text-white" />
          ) : (
            <SlBookOpen className="md:text-2xl text-xl text-white" />
          )}
        </div>
        <div>
          <h2 className="md:text-lg text-sm line-clamp-1">{title}</h2>
          <div className="flex items-center gap-2">
            <p className="text-gray-500 dark:text-gray-300 md:text-sm text-xs">
              {new Date(updatedAt as Date).getTime() >
              new Date(createdAt as Date).getTime()
                ? format(new Date(createdAt as Date), "dd MMMM yyyy")
                : format(new Date(updatedAt as Date), "dd MMMM yyyy")}
            </p>
            {new Date(updatedAt as Date).getTime() >
            new Date(createdAt as Date).getTime() ? (
              <p className="md:text-sm text-xs">(update)</p>
            ) : null}
          </div>
        </div>
      </Link>
      <div className="relative group w-fit">
        <HiOutlineDotsVertical className="text-2xl cursor-pointer" />
        <div className="bg-white rounded-md p-3 flex flex-col opacity-0 group-hover:opacity-100 transition-all duration-300 ease-in-out gap-3 absolute right-3 top-3 text-nowrap dark:text-black">
          <p
            className="flex items-center gap-2 cursor-pointer"
            onClick={async () => {
              await navigator.clipboard.writeText(
                `${process.env.NEXT_PUBLIC_APP_URL}/c/${code}/s/${id}`
              );
              toast.success("Link copied to clipboard!");
            }}
          >
            <HiLink />
            Share Link
          </p>
          <p
            className="flex items-center gap-2 cursor-pointer text-red-600"
            onClick={async () => {
              try {
                await taskService.delete(id);
                toast.success("Tugas berhasil dihapus!");
              } catch (error) {
                const axiosErro = error as AxiosError;
                const data = axiosErro.response?.data as {
                  statusCode: number;
                  message: string;
                };
                toast.error(data.message);
              } finally {
                location.reload();
              }
            }}
          >
            <HiTrash />
            Delete
          </p>
        </div>
      </div>
    </motion.article>
  );
};

export default CardSubjectMatter;
