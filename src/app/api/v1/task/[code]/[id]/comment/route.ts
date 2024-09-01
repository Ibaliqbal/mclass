import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { CommentSubmissionTable } from "@/lib/db/schema";

export const POST = auth(async (req) => {
  const session = req.auth;
  const body = await req.json();
  const url = new URL(req.url);
  const id = url.pathname.split("/")[url.pathname.split("/").length - 2];

  if (!session)
    return Response.json(
      { statusCode: 401, message: "Unautorized" },
      { status: 401 }
    );

  await db.insert(CommentSubmissionTable).values({
    content: body.content,
    student_id: session.user.id,
    submissionId: id,
  });

  return Response.json(
    { statusCode: 201, message: "Success created" },
    { status: 201 }
  );
});
