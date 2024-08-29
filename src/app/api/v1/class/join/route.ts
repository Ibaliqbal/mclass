import { db } from "@/lib/db";
import { ClassTable } from "@/lib/db/schema";
import { eq, sql } from "drizzle-orm";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const exampleIdStudent = "5a92f4c1-808d-4f8c-9297-65aef2b0086e";
  const { code }: { code: string } = await req.json();

  const existingStudents = await db.query.ClassTable.findFirst({
    where: eq(ClassTable.code, code), // Menggunakan eq untuk membandingkan kode dengan drizzle
    columns: {
      students: true,
    },
    with: {
      instructor: true,
    },
  });


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
      students: [...(existingStudents?.students as string[]), exampleIdStudent],
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
}
