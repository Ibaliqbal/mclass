import instance from "@/lib/axios/instance";

export const userService = {
  update: (data: any) => instance.put("/user", data),
  create: (data: {
    name: string;
    email: string;
    password: string;
    nisn?: string;
    role: "Teacher" | "Student";
  }) => instance.post("/register", data),
};
