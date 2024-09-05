import TasksMissingView from "@/views/tasks/tasks-missing-view";
import { seo } from "@/utils/helper";
import type { Metadata } from "next";

export const generateMetadata = ({
  params,
}: {
  params: { code: string };
}): Metadata => {
  return seo(
    `Task ${params.code} is missing - Find out why and how to resolve it`,
    "This page provides information on why the task is missing and steps to address the issue.",
    `/t/missing/${params.code}`
  );
};

const page = ({ params }: { params: { code: string } }) => {
  return <TasksMissingView code={params.code} />;
};

export default page;
