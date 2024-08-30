import CardFile from "@/components/card/card-file";
import { Separator } from "@/components/ui/separator";
import React from "react";
import LayoutSubmission from "@/layouts/submission/layout-submission";
import { taskService } from "@/services/task";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { and, eq } from "drizzle-orm";
import { DoneTaskTable } from "@/lib/db/schema";

const page = async ({ params }: { params: { code: string; id: string } }) => {
  let status: "done" | "assigned" | "missing" = "assigned";
  const today = new Date();
  const session = await auth();
  const { data } = await taskService.detail(params.code, params.id);

  const doneTask = await db.query.DoneTaskTable.findFirst({
    where: and(
      eq(DoneTaskTable.student_id, session?.user.id as string),
      eq(DoneTaskTable.submissionId, data.data.id)
    ),
  });

  if (doneTask) {
    status = "done";
  }

  if (!doneTask && today.getTime() > new Date(data.data.deadline).getTime()) {
    status = "missing";
  }

  return (
    <LayoutSubmission
      title="Tugas ke 10"
      dateCreated="Tika Setiawati ~ 3 Januri 2020"
      deadline="20 Februari 2020"
      point={100}
      type="task"
    >
      <div className="flex flex-col gap-3">
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolor
          placeat sequi dolore sunt expedita, voluptatem temporibus voluptatum
          cupiditate fuga blanditiis.
        </p>
        <div className="grid grid-cols-4 gap-3 my-3">
          {Array.from({ length: 20 }).map((_, i) => (
            <CardFile key={i} index={i} />
          ))}
        </div>
      </div>
      <Separator />
    </LayoutSubmission>
  );
};

export default page;
