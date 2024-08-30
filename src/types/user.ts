import { z } from "zod";

export const resetPasswordSchema = z.object({
  oldPassword: z
    .string()
    .min(8, { message: "Password minimun 8 char" })
    .max(20, { message: "Password miximum 20 char" }),
  newPassword: z
    .string()
    .min(8, { message: "Password minimun 8 char" })
    .max(20, { message: "Password miximum 20 char" }),
});

export type TResetPasswordT = z.infer<typeof resetPasswordSchema>;
