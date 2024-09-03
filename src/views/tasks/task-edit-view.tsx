"use client";
import { Files, taskSchema, TTask } from "@/types/task";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { taskService } from "@/services/task";
import { useState } from "react";
import { AxiosError } from "axios";
import toast from "react-hot-toast";
import FormTask from "@/components/form/form-task";

type Props = {
  title: string;
  deadline: Date;
  type: string;
  description: string;
  files: Files[];
  code: string;
  id: string;
};

const TaskEditView = ({
  code,
  id,
  deadline,
  description,
  files,
  title,
  type,
}: Props) => {
  const [success, setSuccess] = useState("");
  const form = useForm<TTask>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      title,
      description,
      type,
      deadline: new Date(deadline),
      files,
    },
  });

  const onSubmit = async (data: TTask) => {
    try {
      setSuccess("");
      const res = await taskService.update(code, id, data);
      setSuccess(res.data.message);
    } catch (error) {
      const axiosError = error as AxiosError;
      const data = axiosError.response?.data as {
        statusCode: number;
        message: string;
      };
      toast.error(data.message);
    }
  };

  return (
    <FormTask
      form={form}
      onSubmit={onSubmit}
      success={success}
      textBtn="Update"
      title="Edit task"
    />
  );
};

export default TaskEditView;
