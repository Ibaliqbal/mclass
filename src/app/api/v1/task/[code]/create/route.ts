import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { ClassTable, SubmissionTable } from "@/lib/db/schema";
import { TCreateTask } from "@/types/task";
import { eq } from "drizzle-orm";

export const POST = auth(async (req) => {
  const url = new URL(req.url);
  const code = url.pathname.split("/")[4] as string;
  const session = req.auth;
  const body = await req.json();

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

  const classId = await db.query.ClassTable.findFirst({
    where: eq(ClassTable.code, code),
    columns: {
      id: true,
    },
  });

  if (!classId)
    return Response.json(
      { statusCode: 404, message: "Class not found" },
      { status: 404 }
    );

  console.log(classId);

  await db.insert(SubmissionTable).values({
    classId: classId.id, // Cast to the correct type
    title: body.title,
    description: body.description,
    type: body.type as "material" | "task" | "test" | "presence",
    deadline: body.deadline,
    files: body.files,
  });

  return Response.json(
    { statusCode: 201, message: "Success create new task" },
    { status: 201 }
  );
});
