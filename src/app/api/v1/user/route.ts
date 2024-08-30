import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { UserTable } from "@/lib/db/schema";
import { eq, sql } from "drizzle-orm";
import bcrypt from "bcrypt";

export const PUT = auth(async (req) => {
  const session = req.auth;
  const body = await req.json();

  if (!session)
    return Response.json(
      { statusCode: 401, message: "Unautorized" },
      { status: 401 }
    );

  const user = await db.query.UserTable.findFirst({
    where: eq(UserTable.id, session.user.id),
    columns: {
      password: true,
    },
  });

  if (!user)
    return Response.json(
      { statusCode: 404, message: "User not found" },
      { status: 404 }
    );

  const confirm = await bcrypt.compare(body.oldPassword, user.password);

  if (!confirm)
    return Response.json(
      { statusCode: 400, message: "Password is incorrect" },
      { status: 400 }
    );

  const password = await bcrypt.hash(body.newPassword, 10);

  await db
    .update(UserTable)
    .set({
      password,
      updatedAt: sql`now()`,
    })
    .where(eq(UserTable.id, session.user.id));

  return Response.json(
    {
      statusCode: 200,
      message: "Berhasil",
    },
    { status: 200 }
  );
});
