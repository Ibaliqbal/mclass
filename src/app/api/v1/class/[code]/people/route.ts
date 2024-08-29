import { db } from "@/lib/db";
import { ClassTable, UserTable } from "@/lib/db/schema";
import { eq, inArray } from "drizzle-orm";
import { NextRequest } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { code: string } }
) {
  const { code } = params;

  const classDetail = await db.query.ClassTable.findFirst({
    where: eq(ClassTable.code, code),
    with: {
      instructor: {
        columns: {
          name: true,
          avatar: true,
        },
      },
    },
    columns: {
      students: true,
    },
  });

  if (!classDetail)
    return Response.json(
      {
        statusCode: 404,
        message:
          "Please join this class first so you can access all the content in this class. Ask your mentor/teacher for the code",
        instructor: null,
        students: null,
      },
      { status: 404 }
    );

  const students = await db.query.UserTable.findMany({
    where: inArray(UserTable.id, classDetail?.students || []),
    columns: {
      name: true,
      avatar: true,
    },
  });

  return Response.json(
    {
      statusCode: 200,
      message: "Success",
      instructor: classDetail?.instructor,
      students,
    },
    { status: 200 }
  );
}
