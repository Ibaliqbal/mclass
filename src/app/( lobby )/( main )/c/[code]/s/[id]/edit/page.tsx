import { taskService } from "@/services/task";
import TaskEditView from "@/views/tasks/task-edit-view";
import React from "react";
import { seo } from "@/utils/helper";
import type { Metadata } from "next";

export const generateMetadata = ({
  params,
}: {
  params: { code: string; id: string };
}): Metadata => {
  return seo(
    `Edit Submission for Class ${params.code} - Modify Submission ID ${params.id}`,
    `This page allows you to edit submission ID ${params.id} for class ${params.code}, including updating details, feedback, and submission status.`,
    `/c/${params.code}/s/${params.id}/edit`
  );
};

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
