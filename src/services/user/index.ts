import instance from "@/lib/axios/instance";

export const userService = {
  get: () => instance.get("/user"),
  update: (data: any, type: "password" | "avatar") =>
    instance.put(`/user?type=${type}`, data),
  create: (data: {
    name: string;
    email: string;
    password: string;
    nisn?: string;
    role: "Teacher" | "Student";
  }) => instance.post("/register", data),
};
