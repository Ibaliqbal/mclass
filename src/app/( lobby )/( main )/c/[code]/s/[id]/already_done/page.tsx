import { taskService } from "@/services/task";
import TaskAlreadyDoneView from "@/views/tasks/task-already-done-view";
import { seo } from "@/utils/helper";
import type { Metadata } from "next";

export const generateMetadata = ({
  params,
}: {
  params: { code: string; id: string };
}): Metadata => {
  return seo(
    `Submissions Completed for Class ${params.code} - View Who Has Submitted Task ID ${params.id}`,
    `This page provides a list of all students who have submitted their work for task ID ${params.id} in class ${params.code}, including submission dates and statuses.`,
    `/c/${params.code}/s/${params.id}/already_done`
  );
};

const page = async ({ params }: { params: { code: string; id: string } }) => {
  const { code, id } = params;
  const data = (await taskService.done(id)).data?.data;
  return <TaskAlreadyDoneView data={data} />;
};

export default page;
