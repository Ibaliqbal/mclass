import CardTask from "@/components/card/card-task";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { DoneTaskTable, TSubmission } from "@/lib/db/schema";
import { classService } from "@/services/class";
import { format } from "date-fns";
import { eq } from "drizzle-orm";
import { seo } from "@/utils/helper";
import type { Metadata } from "next";

export const generateMetadata = ({
  params,
}: {
  params: { code: string };
}): Metadata => {
  return seo(
    `All Tasks for Class ${params.code} - View and manage class assignments`,
    `This page provides a comprehensive overview of all tasks for class ${params.code}, including details on deadlines, submission status, and materials.`,
    `/c/${params.code}/task_class`
  );
};

const page = async ({ params }: { params: { code: string } }) => {
  const session = await auth();

  const doneTasks = await db.query.DoneTaskTable.findMany({
    where: eq(DoneTaskTable.student_id, session?.user.id as string),
    columns: {
      submissionId: true,
    },
  });

  const done = doneTasks.map((task) => task.submissionId);

  const { data } = await classService.tasks(params.code);

  const datas = data.data.submission.map(
    (
      mission: Pick<
        TSubmission,
        "id" | "deadline" | "createdAt" | "title" | "type"
      >
    ) => ({
      ...mission,
      code: data.data.code,
      status: done.includes(mission.id)
        ? "done"
        : new Date(mission.deadline).getTime() > new Date().getTime()
        ? "assigned"
        : "missing",
    })
  );

  return (
    <div className="mt-4 flex flex-col gap-4 max-w-6xl container">
      {datas.map(
        (
          task: Pick<
            TSubmission,
            "createdAt" | "id" | "title" | "type" | "deadline"
          > & {
            code: string;
            status: "missing" | "assigned" | "done";
          },
          i: number
        ) => (
          <CardTask
            key={i}
            {...{
              index: i,
              code: task.code,
              status: task.status,
              createdAt: format(
                new Date(task.createdAt as Date),
                "dd MMMM yyyy"
              ),
              id: task.id,
              title: task.title,
            }}
          />
        )
      )}
    </div>
  );
};

export default page;
