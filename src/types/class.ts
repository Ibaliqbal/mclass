import { z } from "zod";

export const createClassSchema = z.object({
  class_name: z
    .string({ message: "Class name is required" })
    .min(3, { message: "Name class minimun for 3 characters" }),
  subject: z
    .string({ message: "Subject class is required" })
    .min(3, { message: "Subject class minimun for 3 characters" }),
  room: z.string(),
});

export const joinClassSchema = z.object({
  code: z.string().min(7, { message: "Code class minimun for 3 characters" }),
});

export type TJoinClass = z.infer<typeof joinClassSchema>;

export type TCreateClass = z.infer<typeof createClassSchema>;
