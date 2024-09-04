"use client";
import React from "react";
import toast from "react-hot-toast";
import { HiOutlineDotsVertical, HiTrash } from "react-icons/hi";
import ButtonEditPoint from "../button/button-edit-point";
import { AxiosError } from "axios";
import { taskService } from "@/services/task";

const MoreOption = ({ point, id }: { point: number; id: string }) => {
  return (
    <div className="flex items-center gap-2">
      <ButtonEditPoint point={point} id={id} />
      <div className="relative group w-fit">
        <HiOutlineDotsVertical className="text-2xl cursor-pointer" />
        <div className="bg-white rounded-md p-3 flex flex-col opacity-0 group-hover:opacity-100 transition-all duration-300 ease-in-out gap-3 absolute right-3 top-3 text-nowrap dark:text-black">
          <p
            className="flex items-center gap-2 cursor-pointer text-red-600"
            onClick={async () => {
              try {
                await taskService.deleteSubmitTask(id);
                toast.success("Task deleted successfully!");
              } catch (error) {
                const axiosError = error as AxiosError;
                const res = axiosError.response?.data as {
                  mesaage: string;
                  statusCode: number;
                };
                toast.error(res.mesaage);
              } finally {
                location.reload();
              }
            }}
          >
            <HiTrash />
            Delete Task
          </p>
        </div>
      </div>
    </div>
  );
};

export default MoreOption;
