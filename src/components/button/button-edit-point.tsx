"use client";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import Modal from "../ui/modal";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { motion } from "framer-motion";
import { Input } from "../ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { taskService } from "@/services/task";
import { AxiosError } from "axios";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { FaCheck } from "react-icons/fa6";
import toast from "react-hot-toast";

const pointSchema = z.object({
  point: z
    .string()
    .refine((val) => !isNaN(Number(val)), { message: "Invalid number" })
    .transform((val) => Number(val))
    .pipe(z.number().min(0).max(100)),
});

type TPoint = z.infer<typeof pointSchema>;

const ButtonEditPoint = ({ point, id }: { point: number; id: string }) => {
  const [pointTask, setPointTask] = useState<number>(point);
  const [success, setSuccess] = useState(false);
  const [open, setOpen] = useState(false);
  const form = useForm<TPoint>({
    resolver: zodResolver(pointSchema),
    defaultValues: {
      point: pointTask,
    },
  });

  const onSubmit = async (data: TPoint) => {
    try {
      setSuccess(false);
      const res = (await taskService.updatePoint(data, id)).data;
      setSuccess(true);
    } catch (error) {
      const axiosError = error as AxiosError;
      const res = axiosError.response?.data as {
        statusCode: number;
        message: string;
      };
      toast.error(res.message);
    } finally {
      setPointTask(data.point);
    }
  };

  return (
    <>
      <Button variant="secondary" size="lg" onClick={() => setOpen(true)}>
        {`(${pointTask})`} Chnage point
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
            className="fixed w-[600px] pb-8 overflow-auto bg-white dark:bg-black dark:bg-opacity-80 h-fit flex flex-col gap-4 m-auto inset-0 z-[70] rounded-lg p-3 px-5 modal-post border border-gray-500"
          >
            <h2 className="font-semibold text-2xl">Create Class</h2>

            {success ? (
              <Alert variant="success">
                <FaCheck className="h-4 w-4" />
                <AlertTitle>Success</AlertTitle>
                <AlertDescription>Success update data</AlertDescription>
              </Alert>
            ) : null}
            <FormField
              control={form.control}
              name="point"
              render={({ field }) => (
                <FormItem className="w-1/2">
                  <FormLabel className="text-lg">Point</FormLabel>
                  <FormControl inputMode="numeric">
                    <Input
                      className="text-lg py-7 border-2 border-slate-700 focus:outline-none"
                      placeholder="Enter your class name..."
                      {...field}
                      disabled={form.formState.isSubmitting}
                    />
                  </FormControl>
                  <FormMessage />
                  <FormDescription>
                    The point must be a number between 0 and 100.
                  </FormDescription>
                </FormItem>
              )}
            />
            <div className="flex items-center gap-3 self-start">
              <Button
                onClick={() => setOpen(false)}
                variant="logout"
                type="button"
                className="py-6"
                disabled={form.formState.isSubmitting}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="py-6"
                disabled={form.formState.isSubmitting}
              >
                {form.formState.isSubmitting ? "Loading..." : "Change"}
              </Button>
            </div>
          </motion.form>
        </Form>
      </Modal>
    </>
  );
};

export default ButtonEditPoint;
