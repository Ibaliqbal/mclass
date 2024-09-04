"use client";
import FormSubmitTask from "@/components/form/submission/form-submit-task";
import { AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback } from "@radix-ui/react-avatar";
import React, { ReactNode } from "react";
import { HiLink, HiOutlineDotsVertical, HiUsers } from "react-icons/hi";
import { MdOutlineQuiz } from "react-icons/md";
import FormClassComment from "@/components/form/submission/form-class-comment";
import { SlBookOpen } from "react-icons/sl";
import { toast } from "react-hot-toast";
import ListAlreadySubmitTask from "@/components/class/list-already-submit-task";
import { TSubmission } from "@/lib/db/schema";
import { format } from "date-fns";
import Link from "next/link";
import ListComments from "@/components/task/list-comment";
import { useQuery } from "@tanstack/react-query";
import { userService } from "@/services/user";

type Props = TSubmission & {
  point: number;
  dateCreated: string;
  children: ReactNode;
  role: "Teacher" | "Student";
  students: string[];
  code: string;
};

const LayoutSubmission = ({
  type,
  point,
  title,
  dateCreated,
  deadline,
  children,
  role,
  id,
  students,
  code,
}: Props) => {
  const { data } = useQuery({
    queryKey: ["user-detail"],
    queryFn: async () => (await userService.get()).data?.data,
  });
  return (
    <div
      className={`w-full md:pt-5 pt-3 pb-10 ${
        type !== "material" && type !== "presence"
          ? "lg:grid lg:grid-cols-6 flex flex-col"
          : "container md:max-w-6xl max-w-full"
      } gap-3`}
    >
      <section
        className={`${
          type !== "material" ? "lg:col-span-4" : ""
        } w-full flex gap-4 md:px-3 lg:mb-0 mb-4`}
      >
        <div className="p-4 bg-sky-500 rounded-full lg:block hidden w-fit h-fit">
          {type !== "material" && type !== "presence" ? (
            <MdOutlineQuiz className="text-2xl text-white" />
          ) : (
            <SlBookOpen className="text-2xl text-white" />
          )}
        </div>
        <div className="flex flex-col gap-2 grow pt-3">
          <div className="w-full flex justify-between items-center">
            <h1 className="lg:text-3xl text-xl font-semibold">{title}</h1>
            <div className="relative group w-fit">
              <HiOutlineDotsVertical className="lg:text-2xl text-xl cursor-pointer" />
              <div className="bg-white rounded-md p-3 flex flex-col opacity-0 group-hover:opacity-100 transition-all duration-300 ease-in-out gap-3 absolute right-3 top-3 text-nowrap dark:text-black">
                <p
                  className="flex items-center gap-2 cursor-pointer md:text-lg text-sm"
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
              </div>
            </div>
          </div>
          <p className="text-gray-500 dark:text-gray-300 lg:text-lg text-xs">
            {dateCreated}
          </p>
          <div className="flex items-center justify-between mt-3 lg:text-sm text-xs">
            {role === "Student" ? <p>{point} point</p> : null}
            <p>Deadline : {format(new Date(deadline), "dd MMMM yyyy")}</p>
            {role === "Teacher" ? (
              <Link
                href={`/c/${code}/s/${id}/edit`}
                className="hover:underline"
              >
                Edit
              </Link>
            ) : null}
          </div>

          <Separator />
          {children}

          <div className="flex flex-col gap-4 mt-3">
            <h6 className="flex items-center gap-2 text-lg">
              <HiUsers className="text-xl" /> Komentar Kelas
            </h6>
            <ListComments id={id} />
            <div className="flex gap-3">
              <Avatar className="w-12 h-12 md:block hidden">
                <AvatarImage
                  src={
                    data?.avatar
                      ? data?.avatar
                      : `https://ui-avatars.com/api/?name=${data?.name}&background=random&color=#fff`
                  }
                  alt="Avatar"
                  width={100}
                  height={100}
                  className="object-cover object-center rounded-full"
                />
                <AvatarFallback>{data?.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <FormClassComment id={id} />
            </div>
          </div>
        </div>
      </section>
      {type !== "material" && type !== "presence" ? (
        role === "Student" ? (
          <FormSubmitTask id={id} />
        ) : (
          <ListAlreadySubmitTask students={students} id={id} code={code} />
        )
      ) : null}
    </div>
  );
};

export default LayoutSubmission;
