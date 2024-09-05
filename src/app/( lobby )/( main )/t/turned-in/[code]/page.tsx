import TasksTurendInView from "@/views/tasks/tasks-turned-in-view";
import { seo } from "@/utils/helper";
import type { Metadata } from "next";

export const generateMetadata = ({
  params,
}: {
  params: { code: string };
}): Metadata => {
  return seo(
    `Task ${params.code} turned in - Review the submission details and feedback`,
    "This page provides information on the task submission, including details and any feedback provided.",
    `/t/turned-in/${params.code}`
  );
};

const page = async ({ params }: { params: { code: string } }) => {
  return <TasksTurendInView code={params.code} />;
};

export default page;
