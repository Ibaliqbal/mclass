"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { taskService } from "@/services/task";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { RiSendPlane2Line } from "react-icons/ri";
import { z } from "zod";

const commentSchema = z.object({
  content: z.string().min(5),
});

const FormClassComment = ({ id }: { id: string }) => {
  const form = useForm<z.infer<typeof commentSchema>>({
    resolver: zodResolver(commentSchema),
    defaultValues: {
      content: "",
    },
  });
  const queryClient = useQueryClient();

  const onSubmit = async (data: z.infer<typeof commentSchema>) => {
    try {
      await taskService.comment(data, id);
      toast.success("Berhasil menambahkan komentar kelas");
    } catch (error) {
      const axiosError = error as AxiosError;
      const res = axiosError.response?.data as {
        mesaage: string;
        statusCode: number;
      };
      toast.error(res.mesaage);
    } finally {
      form.reset();
      queryClient.invalidateQueries({ queryKey: ["comments task", id] });
    }
  };

  return (
    <Form {...form}>
      <form className="grow flex gap-3" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormControl>
                <Textarea
                  placeholder="Tinggalkan komentar mu..."
                  className="resize-none"
                  disabled={form.formState.isSubmitting}
                  {...field}
                />
              </FormControl>
              <FormMessage />
              <FormDescription>
                Bagikan pemikiran dan komentar Anda di sini!
              </FormDescription>
            </FormItem>
          )}
        />
        <Button
          variant="icon"
          className="text-start disabled:text-gray-500 disabled:cursor-not-allowed"
          type="submit"
          size="sm"
          disabled={form.formState.isSubmitting}
        >
          <RiSendPlane2Line className="text-xl" />
        </Button>
      </form>
    </Form>
  );
};

export default FormClassComment;
