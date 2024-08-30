import { z } from "zod";

export const createTaskSchema = z.object({
  title: z.string().min(5, { message: "Title task minimun for 5 characters" }),
  description: z
    .string()
    .min(10, { message: "Description task minimun for 10 characters" }),
  deadline: z.date({ required_error: "A date of birth is required." }),
  type: z.string().min(1),
});

export type TCreateTask = z.infer<typeof createTaskSchema>;
