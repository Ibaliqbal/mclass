import CardFile from "@/components/card/card-file";
import { Separator } from "@/components/ui/separator";
import React from "react";
import LayoutSubmission from "@/layouts/submission/layout-submission";
import { taskService } from "@/services/task";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { and, eq } from "drizzle-orm";
import { DoneTaskTable, TSubmission } from "@/lib/db/schema";
import { format } from "date-fns";

const page = async ({ params }: { params: { code: string; id: string } }) => {
  let status: "done" | "assigned" | "missing" = "assigned";
  const today = new Date();
  const session = await auth();
  const { data } = (await taskService.detail(params.code, params.id)).data;

  const doneTask = await db.query.DoneTaskTable.findFirst({
    where: and(
      eq(DoneTaskTable.student_id, session?.user.id as string),
      eq(DoneTaskTable.submissionId, data.id)
    ),
  });

  if (doneTask) {
    status = "done";
  }

  if (!doneTask && today.getTime() > new Date(data.deadline).getTime()) {
    status = "missing";
  }

  return (
    <LayoutSubmission
      {...data}
      dateCreated={`${data.instructor} ~ ${format(
        new Date(data.updatedAt),
        "dd MMMM yyyy"
      )}`}
      point={100}
      status={status}
      role={session?.user.role as "Teacher" | "Student"}
      doneTask={data.doneTask}
      students={data.class}
      code={params.code}
    >
      <div className="flex flex-col gap-3">
        <p>{data.description}</p>
        <div className="grid grid-cols-4 gap-3 my-3">
          {data.files?.map((file: Pick<TSubmission, "files">, i: number) => (
            <CardFile
              key={i}
              index={i}
              icon="download"
              type={i % 2 === 0 ? "image" : "pdf"}
            />
          ))}
        </div>
      </div>
      <Separator />
    </LayoutSubmission>
  );
};

export default page;
