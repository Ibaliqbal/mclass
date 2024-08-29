import CardSubjectMatter from "@/components/card/card-subject-matter";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { DoneTaskTable, TSubmission } from "@/lib/db/schema";
import { classService } from "@/services/class";
import { eq } from "drizzle-orm";

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

  const datas = data.data.submission.map((mission: Pick<TSubmission, "id" | "deadline" | "createdAt" | "title" | "type">) => ({
    ...mission,
    code: data.data.code,
    isDone: done.includes(mission.id),
    deadline:
      mission.deadline &&
      new Date(mission.deadline).getTime() > new Date().getTime(),
  }));

  console.log(datas);

  return (
    <div className="mt-4 flex flex-col gap-4 max-w-6xl container">
      {Array.from({ length: 10 }).map((_, i) => (
        <CardSubjectMatter key={i} index={i} />
      ))}
    </div>
  );
};

export default page;
