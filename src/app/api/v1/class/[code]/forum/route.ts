import { db } from "@/lib/db";
import { ClassTable, SubmissionTable } from "@/lib/db/schema";
import { desc, eq } from "drizzle-orm";
import { NextRequest } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { code: string } }
) {
  const { code } = params;
  const forum = await db.query.ClassTable.findFirst({
    where: eq(ClassTable.code, code),
    with: {
      submission: {
        columns: {
          createdAt: true,
          title: true,
          id: true,
          type: true,
          updatedAt: true,
        },
        orderBy: [desc(SubmissionTable.createdAt)],
      },
    },
    columns: { code: true },
  });

  if (!forum)
    return Response.json(
      {
        statusCode: 200,
        message:
          "Class not found, ask your teacher/mentor for the appropriate code",
        data: null,
      },
      { status: 200 }
    );

  const data = forum.submission.map((mission) => ({
    ...mission,
    code: forum.code,
  }));

  return Response.json(
    {
      message: "Success",
      statusCode: 200,
      data,
    },
    { status: 200 }
  );
}
