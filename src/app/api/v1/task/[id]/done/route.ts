import { db } from "@/lib/db";
import { DoneTaskTable } from "@/lib/db/schema";
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
      createdAt: true,
      files: true,
      point: true,
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
        id: student.id,
        createdAt: student.createdAt,
        files: student.files,
        point: student.point,
        ...student.student,
      })),
    },
    { status: 200 }
  );
}
