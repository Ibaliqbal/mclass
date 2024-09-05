import ClassCreateView from "@/views/class/class-create-view";
import React from "react";
import { seo } from "@/utils/helper";
import type { Metadata } from "next";

export const generateMetadata = ({
  params,
}: {
  params: { code: string };
}): Metadata => {
  return seo(
    `Create Task for Class ${params.code} - Set up new tasks and materials`,
    `This page allows you to create a new task for class ${params.code}, including details on materials, deadlines, and submission guidelines.`,
    `/c/${params.code}/create`
  );
};

const page = ({ params }: { params: { code: string } }) => {
  return <ClassCreateView code={params.code} />;
};

export default page;
