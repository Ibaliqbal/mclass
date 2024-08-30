"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { signInSSchema, TSignInS } from "@/types/student";
import { useRouter } from "next/navigation";
import { login } from "@/actions/auth";

const FormSignIn = () => {
  const router = useRouter();
  const [error, setError] = useState("");
  const form = useForm<TSignInS>({
    resolver: zodResolver(signInSSchema),
    defaultValues: {
      password: "",
      email: "",
    },
  });

  const onSubmit = async (data: TSignInS) => {
    try {
      setError("");
      const form = new FormData();
      form.append("email", data.email);
      form.append("password", data.password);
      await login(form);
      router.push("/");
    } catch (error) {
      setError("Email or password incorrect");
    }
  };

  return (
    <Form {...form}>
      <form
        className="flex flex-col gap-4"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        {error ? <p className="text-center text-red-600">{error}</p> : null}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="md:text-lg text-sm">Email</FormLabel>
              <FormControl>
                <Input
                  className="md:text-xl text-lg md:py-7 py-5 border-2 border-slate-700 focus:outline-none"
                  placeholder="Enter your email..."
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
          {form.formState.isSubmitting ? "Loading..." : "Login"}
        </Button>
      </form>
    </Form>
  );
};

export default FormSignIn;
