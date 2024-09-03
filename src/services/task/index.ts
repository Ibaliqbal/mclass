import instance from "@/lib/axios/instance";
import { Files, TTask } from "@/types/task";

export const taskService = {
  get: (code: string) => instance.get(`/task/${code}`),
  create: (data: TTask, code: string) => instance.post(`/task/${code}`, data),
  getByStatus: (
    code: string,
    status: "missing" | "turned-in" | "not-turned-in"
  ) => instance.get(`/task/${code}?status=${status}`),
  detail: (code: string, id: string) => instance.get(`/task/${code}/${id}`),
  comment: (data: { content: string }, code: string, id: string) =>
    instance.post(`/task/${code}/${id}/comment`, data),
  done: (id: string, code: string) => instance.get(`/task/${code}/${id}/done`),
  getComment: (code: string, id: string) =>
    instance.get(`/task/${code}/${id}/comment`),
  update: (code: string, id: string, data: TTask) =>
    instance.put(`/task/${code}/${id}`, data),
  updatePoint: (data: { point: number }, id: string) =>
    instance.put(`/task/submission/done/${id}`, data),
  submit: (code: string, id: string, data: { files: Files[] }) =>
    instance.post(`/task/${code}/${id}`, data),
  cancelSubmit: (id: string) => instance.delete(`/task/submission/done/${id}`),
};
