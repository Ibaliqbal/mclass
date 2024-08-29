import instance from "@/lib/axios/instance";

export const taskService = {
  get: (code: string) => instance.get(`/task/${code}`),
  getByStatus: (
    code: string,
    status: "missing" | "turned-in" | "not-turned-in"
  ) => instance.get(`/task/${code}?status=${status}`),
  detail: (code: string, id: string) => instance.get(`/task/${code}/${id}`),
};
