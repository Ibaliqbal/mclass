import { db } from "@/lib/db";
import { SubmissionTable } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const id = url.pathname.split("/").pop();

  const task = await db.query.SubmissionTable.findFirst({
    where: eq(SubmissionTable.id, id as string),
    with: {
      doneTask: {
        columns: {
          student_id: true,
        },
      },
    },
  });

  const data = {
    ...task,
    doneTask: task?.doneTask.map((done) => done.student_id),
  };

  return Response.json(
    { statusCode: 200, message: "Success", data },
    { status: 200 }
  );
}
