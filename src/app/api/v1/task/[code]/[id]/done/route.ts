import { db } from "@/lib/db";
import { DoneTaskTable } from "@/lib/db/schema";
import { equal } from "assert";
import { eq } from "drizzle-orm";
import { NextRequest } from "next/server";

export async function GET(
  req: NextRequest,
  {
    params,
  }: {
    params: {
      code: string;
      id: string;
    };
  }
) {
  const { id } = params;

  const students = await db.query.DoneTaskTable.findMany({
    where: eq(DoneTaskTable.submissionId, id),
    columns: {
      id: true,
    },
    with: {
      student: {
        columns: {
          avatar: true,
          name: true,
        },
      },
    },
  });

  return Response.json(
    {
      statusCode: 200,
      message: "Successs",
      data: students.map((student) => ({
        doneId: student.id,
        ...student.student,
      })),
    },
    { status: 200 }
  );
}
