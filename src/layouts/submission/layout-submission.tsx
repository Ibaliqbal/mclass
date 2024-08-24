"use client";
import FormSubmitTask from "@/components/form/submission/form-submit-task";
import { AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Avatar } from "@radix-ui/react-avatar";
import React, { ReactNode } from "react";
import { HiLink, HiOutlineDotsVertical, HiUsers } from "react-icons/hi";
import { MdOutlineQuiz } from "react-icons/md";
import FormClassComment from "@/components/form/submission/form-class-comment";
import { SlBookOpen } from "react-icons/sl";
import { toast } from "react-hot-toast";

type Props = {
  type: "material" | "task" | "test";
  title: string;
  point: number;
  dateCreated: string;
  deadline: string;
  children: ReactNode;
};

const LayoutSubmission = ({
  type,
  point,
  title,
  dateCreated,
  deadline,
  children,
}: Props) => {
  return (
    <div
      className={`w-full pt-5 pb-10 g${
        type !== "material" ? "rid grid-cols-6" : ""
      } gap-3`}
    >
      <section
        className={`${
          type !== "material" ? "col-span-4" : ""
        } w-full flex gap-4 px-3`}
      >
        <div className="p-4 bg-sky-500 rounded-full w-fit h-fit">
          {type !== "material" ? (
            <MdOutlineQuiz className="text-2xl text-white" />
          ) : (
            <SlBookOpen className="text-2xl text-white" />
          )}
        </div>
        <div className="flex flex-col gap-2 grow pt-3">
          <div className="w-full flex justify-between items-center">
            <h1 className="text-3xl font-semibold">{title}</h1>
            <div className="relative group w-fit">
              <HiOutlineDotsVertical className="text-2xl cursor-pointer" />
              <div className="bg-white rounded-md p-3 flex flex-col opacity-0 group-hover:opacity-100 transition-all duration-300 ease-in-out gap-3 absolute right-3 top-3 text-nowrap dark:text-black">
                <p
                  className="flex items-center gap-2 cursor-pointer"
                  onClick={() => toast.success("Copy to clipboard")}
                >
                  <HiLink />
                  Share Link
                </p>
              </div>
            </div>
          </div>
          <p className="text-gray-500 dark:text-gray-300">{dateCreated}</p>
          <div className="flex items-center justify-between mt-3">
            <p>{point} poin</p>
            <p>Tanggal : {deadline}</p>
          </div>

          <Separator />
          {children}

          <div className="flex flex-col gap-4 mt-3">
            <h6 className="flex items-center gap-2 text-lg">
              <HiUsers className="text-xl" /> Komentar Kelas
            </h6>
            <div className="flex gap-3">
              <Avatar className="w-12 h-12">
                <AvatarImage
                  src="/avatar.jpg"
                  alt="Avatar"
                  width={100}
                  height={100}
                  className="object-cover object-center rounded-full"
                />
              </Avatar>
              <FormClassComment />
            </div>
          </div>
        </div>
      </section>
      {type !== "material" ? <FormSubmitTask /> : null}
    </div>
  );
};

export default LayoutSubmission;
