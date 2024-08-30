import instance from "@/lib/axios/instance";
import { TCreateTask } from "@/types/task";

export const taskService = {
  get: (code: string) => instance.get(`/task/${code}`),
  create: (data: TCreateTask, code: string) => instance.post(`/task/${code}/create`, data),
  getByStatus: (
    code: string,
    status: "missing" | "turned-in" | "not-turned-in"
  ) => instance.get(`/task/${code}?status=${status}`),
  detail: (code: string, id: string) => instance.get(`/task/${code}/${id}`),
};
