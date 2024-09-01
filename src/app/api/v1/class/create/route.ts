import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { ClassTable } from "@/lib/db/schema";
import { STATIC_HEADER_PHOTO } from "@/utils/constant";
import { generateRandomCode } from "@/utils/helper";

export const POST = auth(async (req) => {
  const session = req.auth;

  if (!session)
    return Response.json(
      { statusCode: 401, message: "Unautorized" },
      { status: 401 }
    );

  if (session.user.role !== "Teacher")
    return Response.json(
      { statusCode: 400, message: "Invalid role" },
      { status: 400 }
    );

  const header_photo =
    STATIC_HEADER_PHOTO[Math.round(Math.random() * STATIC_HEADER_PHOTO.length)];

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
    instructorId: session.user.id,
    room,
    subject,
    header_photo,
  });

  return Response.json(
    { message: "Success create class", statusCode: 201 },
    { status: 201 }
  );
});
