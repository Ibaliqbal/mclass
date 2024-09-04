"use client";
import Loader from "@/components/loader";
import { taskService } from "@/services/task";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";
import { MdOutlineQuiz } from "react-icons/md";
import { format } from "date-fns";
import { TSubmission } from "@/lib/db/schema";

const ClassTaskTeacherView = ({ code }: { code: string }) => {
  const { isLoading, data } = useQuery({
    queryKey: ["class", code, "tasks"],
    queryFn: async () => (await taskService.get(code)).data?.data,
  });
  return isLoading ? (
    <Loader />
  ) : (
    <div className="flex flex-col gap-4">
      {data.map(
        (
          list: Pick<
            TSubmission,
            "createdAt" | "title" | "updatedAt" | "id"
          > & {
            totalStudents: number;
            alreadyDones: number;
          },
          index: number
        ) => (
          <motion.article
            key={list.id}
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
              href={`/c/${code}/s/${list.id}`}
              className="flex items-center gap-4"
            >
              <div className="p-4 bg-sky-500 rounded-full">
                <MdOutlineQuiz className="text-2xl text-white" />
              </div>
              <div>
                <h2 className="text-lg line-clamp-1">{list.title}</h2>
                <div className="flex items-center gap-2">
                  <p className="text-gray-500 dark:text-gray-300 text-sm">
                    {new Date(list.updatedAt as Date).getTime() >
                    new Date(list.createdAt as Date).getTime()
                      ? format(new Date(list.createdAt as Date), "dd MMMM yyyy")
                      : format(
                          new Date(list.updatedAt as Date),
                          "dd MMMM yyyy"
                        )}
                  </p>
                  {new Date(list.updatedAt as Date).getTime() >
                  new Date(list.createdAt as Date).getTime() ? (
                    <p className="text-sm">(update)</p>
                  ) : null}
                </div>
              </div>
            </Link>
            <Link
              href={`/c/${code}/s/${list.id}/already_done`}
              className="hover:underline hover:text-blue-600 w-fit"
            >{`${list.alreadyDones}/${list.totalStudents}`}</Link>
          </motion.article>
        )
      )}
    </div>
  );
};

export default ClassTaskTeacherView;
