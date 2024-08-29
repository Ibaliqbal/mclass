import { db } from "@/lib/db";
import { UserTable } from "@/lib/db/schema";
import { NextRequest } from "next/server";
import bcrypt from "bcrypt";
import { eq } from "drizzle-orm";

export async function POST(req: NextRequest) {
  const body: {
    name: string;
    email: string;
    password: string;
    nisn: string | undefined;
    role: "Teacher" | "Student";
  } = await req.json();

  if (body.role !== "Student" && body.role !== "Teacher")
    return Response.json(
      { message: "Invalid role user", statusCode: 406 },
      {
        status: 406,
      }
    );

  const existingUser = await db
    .select()
    .from(UserTable)
    .where(eq(UserTable.email, body.email));

  console.log(existingUser);

  if (existingUser.length)
    return Response.json(
      {
        message: "Email already registered",
        statusCode: 409,
      },
      {
        status: 409,
      }
    );

  const password = await bcrypt.hash(body.password, 10);

  if (body.role === "Student") {
    await db.insert(UserTable).values({
      name: body.name,
      email: body.email,
      password,
      nisn: Number(body.nisn),
      role: body.role,
    });

    return Response.json(
      { message: "Success create account", statusCode: 201 },
      { status: 201 }
    );
  }

  await db.insert(UserTable).values({
    name: body.name,
    email: body.email,
    password,
    role: body.role,
  });

  return Response.json(
    { message: "Success create account", statusCode: 201 },
    { status: 201 }
  );
}
