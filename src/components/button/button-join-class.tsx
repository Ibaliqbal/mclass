"use client";
import React, { useState } from "react";
import { Button } from "../ui/button";
import Modal from "../ui/modal";
import { motion } from "framer-motion";
import { Input } from "../ui/input";
import { useForm } from "react-hook-form";
import { joinClassSchema, TJoinClass } from "@/types/class";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { AxiosError } from "axios";
import toast from "react-hot-toast";
import { classService } from "@/services/class";

const ButtonJoinClass = () => {
  const [open, setOpen] = useState(false);
  const form = useForm<TJoinClass>({
    resolver: zodResolver(joinClassSchema),
    defaultValues: {
      code: "",
    },
  });

  const onSubmit = async (data: TJoinClass) => {
    try {
      const res = await classService.join(data);
      if (res.status !== 200) return toast.error(res.data.message);
      toast.success(res.data.message);
    } catch (error) {
      const axiosErr = error as AxiosError;
      console.log(axiosErr);
    } finally {
      form.reset();
    }
  };
  return (
    <div className="w-full">
      <Button className="w-full" onClick={() => setOpen(true)}>
        Join class
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
            className="fixed w-[600px] pb-8 overflow-auto dark:bg-black bg-white dark:bg-opacity-80 h-fit flex flex-col gap-4 m-auto inset-0 z-[70] rounded-lg p-3 modal-post border border-gray-500"
          >
            <FormField
              control={form.control}
              name="code"
              render={({ field }) => (
                <FormItem className="pt-4 rounded-md flex flex-col gap-3">
                  <FormLabel className="text-xl font-semibold">
                    Class Name
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="w-[50%] mt-4 h-14"
                      placeholder="Masukkan kode kelas"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Mintalah kode kelas kepada pengajar, lalu masukkan kode di
                    sini.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center gap-3 self-start mt-5">
              <Button
                variant="logout"
                type="button"
                onClick={() => setOpen(false)}
                disabled={form.formState.isSubmitting}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting ? "Loading..." : "Gabung"}
              </Button>
            </div>
          </motion.form>
        </Form>
      </Modal>
    </div>
  );
};

export default ButtonJoinClass;
