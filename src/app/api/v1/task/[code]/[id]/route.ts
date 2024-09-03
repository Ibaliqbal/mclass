import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { SubmissionTable } from "@/lib/db/schema";
import { eq, sql } from "drizzle-orm";
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
        with: {
          instructor: {
            columns: {
              name: true,
            },
          },
        },
      },
    },
  });

  const data = {
    ...task,
    doneTask: task?.doneTask.map((done) => done.student_id),
    class: task?.class.students,
    instructor: task?.class.instructor.name,
  };

  return Response.json(
    { statusCode: 200, message: "Success", data },
    { status: 200 }
  );
}

export const PUT = auth(async (req) => {
  const session = req.auth;
  const body = await req.json();
  const url = new URL(req.url);
  const id = url.pathname.split("/").pop() as string;

  if (!session)
    return Response.json(
      { statusCode: 401, message: "Unautorized" },
      { status: 401 }
    );

  if (session.user.role !== "Teacher")
    return Response.json(
      { statusCode: 403, message: "Invalid role" },
      { status: 403 }
    );

  await db
    .update(SubmissionTable)
    .set({
      title: body.title,
      description: body.description,
      deadline: body.deadline,
      files: body.files,
      type: body.type as "material" | "task" | "test" | "presence",
      updatedAt: sql`now()`,
    })
    .where(eq(SubmissionTable.id, id));

  return Response.json(
    { statusCode: 200, message: "Update data success" },
    { status: 200 }
  );
});
