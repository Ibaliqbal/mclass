import instance from "@/lib/axios/instance";

export const userService = {
  update: () => instance.put("/user"),
  create: (data: {
    name: string;
    email: string;
    password: string;
    nisn?: string;
    role: "Teacher" | "Student";
  }) => instance.post("/register", data),
};
