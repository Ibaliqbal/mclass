import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { CommentSubmissionTable } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { NextRequest } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { code: string; id: string } }
) {
  const { id } = params;

  const comments = await db.query.CommentSubmissionTable.findMany({
    where: eq(CommentSubmissionTable.submissionId, id),
    with: {
      student: {
        columns: {
          name: true,
          avatar: true,
        },
      },
    },
    columns: {
      id: true,
      content: true,
      createdAt: true,
    },
  });

  return Response.json(
    {
      statusCode: 200,
      message: "Success",
      data: comments.map((comment) => {
        return {
          id: comment.id,
          content: comment.content,
          createdAt: comment.createdAt,
          ...comment.student,
        };
      }),
    },
    { status: 200 }
  );
}

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
