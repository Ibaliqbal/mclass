import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { ClassTable } from "@/lib/db/schema";
import { eq, sql } from "drizzle-orm";

export const POST = auth(async (req) => {
  const session = req.auth;
  const exampleIdStudent = "5a92f4c1-808d-4f8c-9297-65aef2b0086e";
  const { code }: { code: string } = await req.json();

  if (!session)
    return Response.json(
      { statusCode: 401, message: "Unautorized" },
      { status: 401 }
    );

  const existingStudents = await db.query.ClassTable.findFirst({
    where: eq(ClassTable.code, code), // Menggunakan eq untuk membandingkan kode dengan drizzle
    columns: {
      students: true,
    },
    with: {
      instructor: true,
    },
  });

  if (!existingStudents)
    return Response.json(
      { statusCode: 404, message: "Class nor found" },
      { status: 404 }
    );

  const isExist = existingStudents?.students.find(
    (student) => student === exampleIdStudent
  );

  if (isExist)
    return Response.json(
      {
        message: "Already joined for this class",
        statusCode: 202,
      },
      { status: 202 }
    );

  await db
    .update(ClassTable)
    .set({
      students: [...(existingStudents?.students as string[]), session.user.id],
      updatedAt: sql`now()`,
    })
    .where(eq(ClassTable.code, code));

  return Response.json(
    {
      statusCode: 200,
      message: "Successfully join class",
    },
    { status: 200 }
  );
});
