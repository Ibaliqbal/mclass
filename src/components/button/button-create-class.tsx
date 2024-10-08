"use client";
import React, { useState } from "react";
import { Button } from "../ui/button";
import Modal from "../ui/modal";
import { motion } from "framer-motion";
import { Input } from "../ui/input";
import { useForm } from "react-hook-form";
import { createClassSchema, TCreateClass } from "@/types/class";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { AxiosError } from "axios";
import toast from "react-hot-toast";
import { classService } from "@/services/class";

const ButtonCraeteClass = () => {
  const [open, setOpen] = useState(false);
  const form = useForm<TCreateClass>({
    resolver: zodResolver(createClassSchema),
  });

  const onSubmit = async (data: TCreateClass) => {
    try {
      const res = await classService.create(data);

      toast.success(res.data?.message);
      location.reload();
    } catch (error) {
      const axiosErr = error as AxiosError;
      const data = axiosErr.response?.data as {
        message: string;
        statusCode: number;
      };
      toast.error(data.message);
    } finally {
      form.reset();
    }
  };

  return (
    <div className="w-full">
      <Button className="w-full" onClick={() => setOpen(true)}>
        Craete class
      </Button>
      <Modal open={open} setOpen={setOpen}>
        <Form {...form}>
          <motion.form
            initial={{ opacity: 0, translateY: 200 }}
            animate={{
              opacity: 1,
              translateY: 0,
            }}
            exit={{
              opacity: 0,
              translateY: -200,
            }}
            transition={{
              duration: 0.3,
              ease: "easeInOut",
              type: "tween",
            }}
            onSubmit={form.handleSubmit(onSubmit)}
            className="fixed md:w-[600px] w-[320px] pb-8 overflow-auto bg-white dark:bg-black dark:bg-opacity-80 h-fit flex flex-col gap-4 lg:my-auto mx-auto md:mt-52 mt-36 inset-0 z-[70] rounded-lg p-3 px-5 modal-post border border-gray-500"
          >
            <h2 className="font-semibold text-2xl">Create Class</h2>
            <FormField
              control={form.control}
              name="class_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg">Class Name</FormLabel>
                  <FormControl>
                    <Input
                      className="text-lg md:py-7 py-5 border-2 border-slate-700 focus:outline-none"
                      placeholder="Enter your class name..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="subject"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg">Subject</FormLabel>
                  <FormControl>
                    <Input
                      className="text-lg md:py-7 py-5 border-2 border-slate-700 focus:outline-none"
                      placeholder="Enter your subject..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="room"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg">Room</FormLabel>
                  <FormControl>
                    <Input
                      className="text-lg md:py-7 py-5 border-2 border-slate-700 focus:outline-none"
                      placeholder="Enter your room class..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center gap-3 self-start">
              <Button
                onClick={() => setOpen(false)}
                variant="logout"
                type="button"
                className="md:py-6 py-4"
                disabled={form.formState.isSubmitting}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="md:py-6 py-4"
                disabled={form.formState.isSubmitting}
              >
                {form.formState.isSubmitting ? "Loading..." : "Create"}
              </Button>
            </div>
          </motion.form>
        </Form>
      </Modal>
    </div>
  );
};

export default ButtonCraeteClass;
