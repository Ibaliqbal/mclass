import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { DoneTaskTable, SubmissionTable } from "@/lib/db/schema";
import { and, eq } from "drizzle-orm";

export const GET = auth(async (req) => {
  const session = req.auth;
  const url = new URL(req.url);
  const id = url.pathname.split("/")[url.pathname.split("/").length - 2];
  let status: "done" | "assigned" | "missing" = "assigned";

  if (!session)
    return Response.json(
      { statusCode: 401, message: "Unautorized" },
      { status: 401 }
    );

  if (session.user.role !== "Student" && session.user.role !== "Teacher")
    return Response.json(
      { statusCode: 403, message: "Invalid role" },
      { status: 403 }
    );

  const deadlineTask = await db.query.SubmissionTable.findFirst({
    where: eq(SubmissionTable.id, id),
    columns: {
      deadline: true,
    },
  });

  const doneTask = await db.query.DoneTaskTable.findFirst({
    where: and(
      eq(DoneTaskTable.submissionId, id),
      eq(DoneTaskTable.student_id, session.user.id)
    ),
    columns: {
      id: true,
      files: true,
    },
  });

  if (!doneTask) {
    if (
      new Date().getTime() >
      new Date(deadlineTask?.deadline as string).getTime()
    ) {
      status = "missing";
      return Response.json(
        {
          statusCode: 200,
          message: "Success get data",
          data: { status, files: [], idDone: "" },
        },
        {
          status: 200,
        }
      );
    }
    return Response.json(
      {
        statusCode: 200,
        message: "Success get data",
        data: { status, files: [], idDone: "" },
      },
      {
        status: 200,
      }
    );
  }
  status = "done";
  return Response.json(
    {
      statusCode: 200,
      message: "Success",
      data: {
        status,
        files: doneTask.files,
        idDone: doneTask.id,
      },
    },
    { status: 200 }
  );
});
