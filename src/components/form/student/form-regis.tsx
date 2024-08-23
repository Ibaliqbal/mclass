"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
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
import { registerSSchema, TRegisS } from "@/types/student";

const FormRegis = () => {
  const form = useForm<TRegisS>({
    resolver: zodResolver(registerSSchema),
    defaultValues: {
      confirmPassword: "",
      password: "",
      email: "",
      name: "",
      nisn: "",
    },
  });

  const onSubmit = (data: TRegisS) => {
    console.log(data);
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
              <FormLabel className="text-lg">Name</FormLabel>
              <FormControl>
                <Input
                  className="text-xl py-7 border-2 border-slate-700 focus:outline-none"
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
              <FormLabel className="text-lg">Email</FormLabel>
              <FormControl>
                <Input
                  className="text-xl py-7 border-2 border-slate-700 focus:outline-none"
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
          name="nisn"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg">NISN</FormLabel>
              <FormControl>
                <Input
                  className="text-xl py-7 border-2 border-slate-700 focus:outline-none"
                  placeholder="Enter your nisn.."
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
              <FormLabel className="text-lg">Password</FormLabel>
              <FormControl>
                <Input
                  className="text-xl py-7 border-2 border-slate-700 focus:outline-none"
                  placeholder="Enter your password.."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg">Confirm Password</FormLabel>
              <FormControl>
                <Input
                  className="text-xl py-7 border-2 border-slate-700 focus:outline-none"
                  placeholder="Enter your confirm password.."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="py-6 self-start" variant="primary">
          Register
        </Button>
      </form>
    </Form>
  );
};

export default FormRegis;
