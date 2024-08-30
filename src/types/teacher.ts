import { z } from "zod";

export const registerTSchema = z.object({
  name: z.string().min(2).max(50),
  email: z.string().email({ message: "Email not valid" }),
  password: z
    .string()
    .min(8, { message: "Password minimun 8 char" })
    .max(20, { message: "Password miximum 20 char" }),
});

export const signInTSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(8, { message: "Password minimun 8 char" })
    .max(20, { message: "Password miximum 20 char" }),
});

export type TSignInT = z.infer<typeof signInTSchema>;

export type TRegisT = z.infer<typeof registerTSchema>;
