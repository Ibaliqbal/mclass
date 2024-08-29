import { db } from "@/lib/db";
import { ClassTable } from "@/lib/db/schema";
import { generateRandomCode } from "@/utils/helper";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const idTeacherExample = "708a571d-354b-475d-b0b4-495155ed89f3";
  const {
    class_name,
    room,
    subject,
  }: {
    class_name: string;
    subject: string;
    room: string;
  } = await req.json();

  const codes = await db
    .select({
      code: ClassTable.code,
    })
    .from(ClassTable);

  await db.insert(ClassTable).values({
    className: class_name,
    code: generateRandomCode(
      7,
      codes.map((code) => code.code)
    ),
    instructorId: idTeacherExample,
    room,
    subject,
  });

  return Response.json(
    { message: "Success create class", statusCode: 201 },
    { status: 201 }
  );
}
