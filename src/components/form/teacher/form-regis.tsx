"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../ui/form";
import { Input } from "../../ui/input";
import { Button } from "../../ui/button";
import { registerTSchema, TRegisT } from "@/types/teacher";
import { AxiosError } from "axios";
import toast from "react-hot-toast";
import { userService } from "@/services/user";

const FormRegis = () => {
  const form = useForm<TRegisT>({
    resolver: zodResolver(registerTSchema),
    defaultValues: {
      password: "",
      email: "",
      name: "",
    },
  });

  const onSubmit = async (data: TRegisT) => {
    try {
      // Call API to register the student

      await userService.create({
        ...data,
        role: "Teacher",
      });

      toast.success("Registration successful!");
    } catch (error) {
      const axiosError = error as AxiosError;
      const res = axiosError.response?.data as {
        message: string;
        statusCode: number;
      };
      toast.error(res.message);
    } finally {
      form.reset();
    }
  };

  return (
    <Form {...form}>
      <form
        className="flex flex-col gap-4"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="md:text-lg text-sm">Name</FormLabel>
              <FormControl>
                <Input
                  className="md:text-xl text-lg md:py-7 py-5 border-2 border-slate-700 focus:outline-none"
                  placeholder="Enter your name.."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="md:text-lg text-sm">Email</FormLabel>
              <FormControl>
                <Input
                  className="md:text-xl text-lg md:py-7 py-5 border-2 border-slate-700 focus:outline-none"
                  placeholder="Enter your email.."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="md:text-lg text-sm">Password</FormLabel>
              <FormControl>
                <Input
                  className="md:text-xl text-lg md:py-7 py-5 border-2 border-slate-700 focus:outline-none"
                  placeholder="Enter your password.."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="py-6 self-start"
          variant="primary"
          disabled={form.formState.isSubmitting}
        >
          {form.formState.isSubmitting ? "Loading..." : "Register"}
        </Button>
      </form>
    </Form>
  );
};

export default FormRegis;
