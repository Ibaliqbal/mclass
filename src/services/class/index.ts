import instance from "@/lib/axios/instance";

export const classService = {
  get: () => instance.get(`/class`),
  join: (data: { code: string }) => instance.post("/class/join", data),
  create: (data: { class_name: string; subject: string; room: string }) =>
    instance.post("/class/create", data),
  detail: (code: string) => instance.get(`/class/${code}`),
  forum: (code: string) => instance.get(`/class/${code}/forum`),
  tasks: (code: string) => instance.get(`/class/${code}/tasks`),
  people: (code: string) => instance.get(`/class/${code}/people`),
};
