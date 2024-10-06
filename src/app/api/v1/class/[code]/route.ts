import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { ClassTable } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
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
      instructorId: true,
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

export const DELETE = auth(async (req) => {
  const session = req.auth;
  const url = new URL(req.url);
  const code = url.pathname.split("/").pop() as string;

  if (!session)
    return Response.json(
      { statusCode: 401, message: "Unautorized" },
      { status: 401 }
    );

  const instuctorId = await db.query.ClassTable.findFirst({
    where: eq(ClassTable.code, code),
    columns: {
      instructorId: true,
    },
  });

  if (
    session.user.role !== "Teacher" &&
    instuctorId?.instructorId !== session.user.id
  )
    return Response.json(
      { statusCode: 403, message: "Access denied" },
      { status: 403 }
    );

  await db.delete(ClassTable).where(eq(ClassTable.code, code));

  return Response.json(
    { statusCode: 200, message: "Success deleted class" },
    { status: 200 }
  );
});
