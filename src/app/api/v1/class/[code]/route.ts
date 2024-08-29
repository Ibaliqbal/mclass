import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { ClassTable } from "@/lib/db/schema";
import { and, arrayContains, eq } from "drizzle-orm";
import { NextRequest } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { code: string } }
) {
  const { code } = params;
  const infoClass = await db.query.ClassTable.findFirst({
    where: eq(ClassTable.code, code),
    with: {
      instructor: {
        columns: {
          name: true,
        },
      },
    },
    columns: {
      students: true,
      code: true,
      className: true,
      header_photo: true,
      room: true,
      subject: true,
    },
  });

  if (!infoClass)
    return Response.json(
      {
        statusCode: 404,
        message:
          "Class not found, ask your teacher/mentor for the appropriate code",
        data: null,
      },
      { status: 404 }
    );

  return Response.json(
    { statusCode: 200, message: "Success", data: infoClass },
    { status: 200 }
  );
}
