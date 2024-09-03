import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { DoneTaskTable } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export const PUT = auth(async (req) => {
  const session = req.auth;
  const body = await req.json();
  const url = new URL(req.url);
  const id = url.pathname.split("/").pop() as string;

  if (!session)
    return Response.json(
      { statusCode: 401, message: "Unautorized" },
      { status: 401 }
    );

  if (session.user.role !== "Teacher")
    return Response.json(
      { statusCode: 403, message: "Invalid role" },
      { status: 403 }
    );

  await db
    .update(DoneTaskTable)
    .set({
      point: body.point,
    })
    .where(eq(DoneTaskTable.id, id));

  return Response.json(
    { statusCode: 200, messsge: "Success update data" },
    { status: 200 }
  );
});

export const DELETE = auth(async (req) => {
  const session = req.auth;
  const url = new URL(req.url);
  const id = url.pathname.split("/").pop() as string;

  if (!session)
    return Response.json(
      { statusCode: 401, message: "Unautorized" },
      { status: 401 }
    );

  if (session.user.role !== "Student" && session.user.role !== "Teacher")
    return Response.json(
      { statusCode: 403, message: "Invalid role" },
      { status: 403 }
    );

  await db.delete(DoneTaskTable).where(eq(DoneTaskTable.id, id));

  return Response.json(
    { statusCode: 200, messsge: "Success delete data" },
    { status: 200 }
  );
});
