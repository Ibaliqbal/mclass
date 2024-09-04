import instance from "@/lib/axios/instance";
import { Files, TTask } from "@/types/task";

export const taskService = {
  get: (code: string) => instance.get(`/task/c/${code}`),
  create: (data: TTask, code: string) => instance.post(`/task/c/${code}`, data),
  getByStatus: (
    code: string,
    status: "missing" | "turned-in" | "not-turned-in"
  ) => instance.get(`/task/c/${code}?status=${status}`),
  detail: (id: string) => instance.get(`/task/${id}`),
  comment: (data: { content: string }, id: string) =>
    instance.post(`/task/${id}/comment`, data),
  done: (id: string) => instance.get(`/task/${id}/done`),
  getComment: (id: string) => instance.get(`/task/${id}/comment`),
  update: (id: string, data: TTask) => instance.put(`/task/${id}`, data),
  updatePoint: (data: { point: number }, id: string) =>
    instance.put(`/task/submission/done/${id}`, data),
  submit: (id: string, data: { files: Files[] }) =>
    instance.post(`/task/${id}`, data),
  deleteSubmitTask: (id: string) => instance.delete(`/task/submission/done/${id}`),
  status: (id: string) => instance.get(`/task/${id}/status`),
};
