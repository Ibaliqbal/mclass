"use client";
import { taskSchema, TTask } from "@/types/task";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { taskService } from "@/services/task";
import { useState } from "react";
import { AxiosError } from "axios";
import toast from "react-hot-toast";
import FormTask from "@/components/form/form-task";

const ClassCreateView = ({ code }: { code: string }) => {
  const [success, setSuccess] = useState("");
  const form = useForm<TTask>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      title: "",
      description: "",
      type: "",
    },
  });

  const onSubmit = async (data: TTask) => {
    try {
      setSuccess("");
      const res = await taskService.create(data, code);
      setSuccess(res.data.message);
    } catch (error) {
      const axiosError = error as AxiosError;
      const data = axiosError.response?.data as {
        statusCode: number;
        message: string;
      };
      toast.error(data.message);
    } finally {
      form.reset();
    }
  };

  return <FormTask form={form} onSubmit={onSubmit} success={success} textBtn="Craete" title="Create new task" />;
};

export default ClassCreateView;
