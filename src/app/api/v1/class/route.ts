import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { ClassTable } from "@/lib/db/schema";
import { arrayContains } from "drizzle-orm";
import jwt, { JwtPayload } from "jsonwebtoken";
import { NextResponse } from "next/server";

export const GET = auth(async (req) => {
  const token = req.headers.get("Authorization")?.split(" ")[1] || "";

  if (!token)
    return NextResponse.json(
      { statusCode: 501, message: "Unautorized", classes: null },
      { status: 501 }
    );

  // Menggunakan Promise untuk jwt.verify
  const decoded = await new Promise<JwtPayload | null>((resolve, reject) => {
    jwt.verify(token, process.env.NEXTAUTH_SECRET || "", (err, decoded) => {
      if (err) return reject(err);
      resolve(decoded as JwtPayload);
    });
  });

  if (!decoded)
    return NextResponse.json(
      {
        statusCode: 501,
        message: "Unautorized",
        classes: null,
      },
      {
        status: 501,
      }
    );

  const classes = await db.query.ClassTable.findMany({
    where: arrayContains(ClassTable.students, [decoded.id]),
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

  console.log(classes);

  return NextResponse.json(
    {
      statusCode: 200,
      mesaage: "Success get all class",
      classes,
    },
    { status: 200 }
  );
});
