import { z } from "zod";

export const signInSSchema = z.object({
  email: z.string().email(),
  nisn: z
    .string()
    .min(16, { message: "Minimun length of NISN 16 char" })
    .max(16),
  password: z.string().min(8).max(20),
});

export const registerSSchema = z
  .object({
    name: z.string().min(2).max(50),
    email: z.string().email({ message: "Email not valid" }),
    nisn: z
      .string()
      .min(16, { message: "Minimun length of NISN 16 char" })
      .max(16),
    password: z.string().min(8, { message: "Password minimun 8 char" }).max(20),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type TSignInS = z.infer<typeof signInSSchema>;
export type TRegisS = z.infer<typeof registerSSchema>;
