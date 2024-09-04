import { taskService } from "@/services/task";
import TaskEditView from "@/views/tasks/task-edit-view";
import React from "react";

const page = async ({ params }: { params: { code: string; id: string } }) => {
  const { code, id } = params;
  const data = (await taskService.detail(id)).data?.data;
  return (
    <TaskEditView
      code={code}
      id={id}
      title={data.title}
      description={data.description}
      deadline={data.deadline}
      files={data.files}
      type={data.type}
    />
  );
};

export default page;
