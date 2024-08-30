import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { ClassTable } from "@/lib/db/schema";
import { arrayContains, eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export const GET = auth(async (req) => {
  const session = req.auth;

  if (!session)
    return NextResponse.json(
      { statusCode: 401, message: "Unautorized", classes: null },
      { status: 401 }
    );

  if (session.user.role === "Student") {
    const classes = await db.query.ClassTable.findMany({
      where: arrayContains(ClassTable.students, [session.user.id]),
      with: {
        instructor: {
          columns: {
            avatar: true,
            name: true,
          },
        },
      },
      columns: {
        code: true,
        className: true,
        header_photo: true,
        subject: true,
      },
    });
    return NextResponse.json(
      {
        statusCode: 200,
        mesaage: "Success get all class",
        classes,
      },
      { status: 200 }
    );
  }

  const classes = await db.query.ClassTable.findMany({
    where: eq(ClassTable.instructorId, session.user.id),
    with: {
      instructor: {
        columns: {
          avatar: true,
          name: true,
        },
      },
    },
    columns: {
      code: true,
      className: true,
      header_photo: true,
      subject: true,
    },
  });

  return NextResponse.json(
    {
      statusCode: 200,
      mesaage: "Success get all class",
      classes,
    },
    { status: 200 }
  );
});
