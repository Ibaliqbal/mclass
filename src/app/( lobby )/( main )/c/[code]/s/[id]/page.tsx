import CardFile from "@/components/card/card-file";
import { Separator } from "@/components/ui/separator";
import React from "react";
import LayoutSubmission from "@/layouts/submission/layout-submission";
import { taskService } from "@/services/task";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { and, eq } from "drizzle-orm";
import { DoneTaskTable } from "@/lib/db/schema";
import { format } from "date-fns";
import { Files } from "@/types/task";
import { seo } from "@/utils/helper";
import type { Metadata } from "next";

export const generateMetadata = ({
  params,
}: {
  params: { code: string; id: string };
}): Metadata => {
  return seo(
    `Submission Details for Class ${params.code} - Review Submission ID ${params.id}`,
    `This page provides detailed information about submission ID ${params.id} for class ${params.code}, including feedback, grades, and submission status.`,
    `/c/${params.code}/s/${params.id}`
  );
};

const page = async ({ params }: { params: { code: string; id: string } }) => {
  const session = await auth();
  const { data } = (await taskService.detail(params.id)).data;

  const doneTask = await db.query.DoneTaskTable.findFirst({
    where: and(
      eq(DoneTaskTable.student_id, session?.user.id as string),
      eq(DoneTaskTable.submissionId, data.id)
    ),
    columns: {
      point: true,
    },
  });

  return (
    <LayoutSubmission
      {...data}
      dateCreated={`${data.instructor} ~ ${format(
        new Date(data.updatedAt),
        "dd MMMM yyyy"
      )}`}
      point={doneTask?.point || 0}
      role={session?.user.role as "Teacher" | "Student"}
      students={data.class}
      code={params.code}
    >
      <div className="flex flex-col gap-3">
        <p className="lg:text-lg text-sm">{data.description}</p>
        <div className="grid lg:grid-cols-4 md:grid-cols-2 lg:gap-3 gap-5 my-3">
          {data.files?.map((file: Files, i: number) => (
            <CardFile
              key={i}
              index={i}
              withIcon
              {...file}
              totalList={data.files.length}
            />
          ))}
        </div>
      </div>
      <Separator />
    </LayoutSubmission>
  );
};

export default page;
