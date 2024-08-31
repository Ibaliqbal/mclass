import { db } from "@/lib/db";
import { SubmissionTable } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { NextRequest } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { code: string; id: string } }
) {
  const task = await db.query.SubmissionTable.findFirst({
    where: eq(SubmissionTable.id, params.id),
    with: {
      doneTask: {
        columns: {
          student_id: true,
        },
      },
      class: {
        columns: {
          students: true,
        },
      },
    },
  });

  const data = {
    ...task,
    doneTask: task?.doneTask.map((done) => done.student_id),
    class: task?.class.students,
  };

  return Response.json(
    { statusCode: 200, message: "Success", data },
    { status: 200 }
  );
}
