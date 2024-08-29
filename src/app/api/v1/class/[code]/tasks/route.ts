import { db } from "@/lib/db";
import { ClassTable, SubmissionTable } from "@/lib/db/schema";
import { eq, or } from "drizzle-orm";
import { NextRequest } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { code: string } }
) {
  const { code } = params;

  const tasks = await db.query.ClassTable.findFirst({
    where: eq(ClassTable.code, code),
    with: {
      submission: {
        columns: {
          createdAt: true,
          title: true,
          id: true,
          type: true,
          deadline: true,
        },
        where: or(
          eq(SubmissionTable.type, "task"),
          eq(SubmissionTable.type, "test")
        ),
      },
    },
    columns: {
      code: true,
    },
  });

  if (!tasks)
    return Response.json(
      {
        statusCode: 200,
        message:
          "Please join this class first so you can access all the content in this class. Ask your mentor/teacher for the code",
        data: null,
      },
      { status: 200 }
    );

  return Response.json(
    {
      message: "Success",
      statusCode: 200,
      data: tasks,
    },
    {
      status: 200,
    }
  );
}
