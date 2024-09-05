import TasksNotTurnedInView from "@/views/tasks/tasks-not-turned-in-view";
import { seo } from "@/utils/helper";
import type { Metadata } from "next";

export const generateMetadata = ({
  params,
}: {
  params: { code: string };
}): Metadata => {
  return seo(
    `Task ${params.code} not turned in - Understand the reasons and find solutions`,
    "This page explains why the task was not turned in and offers guidance on how to address the issue.",
    `/t/not-turned-in/${params.code}`
  );
};

const page = async ({ params }: { params: { code: string } }) => {
  return <TasksNotTurnedInView code={params.code} />;
};

export default page;
