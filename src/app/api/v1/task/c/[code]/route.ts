import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { ClassTable, DoneTaskTable, SubmissionTable } from "@/lib/db/schema";
import {
  filterTaskMissing,
  filterTaskNotTurnedIn,
  filterTaskTurnedIn,
} from "@/services/task/method";
import { and, arrayContains, eq, or } from "drizzle-orm";

export const GET = auth(async (req) => {
  const session = req.auth;

  const url = new URL(req.url);
  const code = url.pathname.split("/").pop() as string;
  const status = req.nextUrl.searchParams.get("status") as
    | "missing"
    | "turned-in"
    | "not-turned-in";

  if (!session)
    return Response.json(
      { statudCode: 401, message: "Unautorized" },
      { status: 401 }
    );

  if (session.user.role === "Teacher") {
    const tasks = await db.query.ClassTable.findFirst({
      where: eq(ClassTable.code, code),
      columns: {
        students: true,
      },
      with: {
        submission: {
          columns: {
            id: true,
            title: true,
            createdAt: true,
            updatedAt: true,
          },
          where: or(
            eq(SubmissionTable.type, "task"),
            eq(SubmissionTable.type, "test")
          ),
          with: {
            doneTask: {
              columns: {
                id: true,
                student_id: true,
              },
            },
          },
        },
      },
    });

    const data = tasks?.submission.map((task) => {
      return {
        totalStudents: tasks.students.length,
        alreadyDones: task.doneTask.length,
        id: task.id,
        createdAt: task.createdAt,
        title: task.title,
        updatedAt: task.updatedAt,
      };
    });

    console.log(data);

    return Response.json(
      {
        message: `Successfully get tasks class with code ${code}`,
        statusCode: 200,
        data,
      },
      { status: 200 }
    );
  }

  const doneTasks = await db.query.DoneTaskTable.findMany({
    where: eq(DoneTaskTable.student_id, session?.user.id as string),
    columns: {
      submissionId: true,
    },
  });

  if (code === "all") {
    const classes = await db.query.ClassTable.findMany({
      where: arrayContains(ClassTable.students, [session?.user.id as string]),
      columns: {
        code: true,
        className: true,
      },
    });
    const tasks = await db.query.ClassTable.findMany({
      where: arrayContains(ClassTable.students, [session?.user.id as string]),
      with: {
        submission: {
          where: or(
            eq(SubmissionTable.type, "task"),
            eq(SubmissionTable.type, "test")
          ),
          columns: {
            title: true,
            createdAt: true,
            id: true,
            deadline: true,
          },
        },
      },
      columns: {
        code: true,
        className: true,
      },
    });

    const submission = tasks.flatMap((task) => {
      return task.submission.map((t) => ({ ...t, classCode: task.code }));
    });

    if (status === "missing") {
      const data = filterTaskMissing(submission, doneTasks);

      return Response.json(
        {
          message: `Successfully with status missing all`,
          statusCode: 200,
          data,
          classes,
        },
        { status: 200 }
      );
    }

    if (status === "turned-in") {
      const data = filterTaskTurnedIn(submission, doneTasks);

      return Response.json(
        {
          message: `Successfully with status turned-in all`,
          statusCode: 200,
          data,
          classes,
        },
        { status: 200 }
      );
    }

    if (status === "not-turned-in") {
      const data = filterTaskNotTurnedIn(submission, doneTasks);

      return Response.json(
        {
          message: `Successfully with status not-turned-in all`,
          statusCode: 200,
          data,
          classes,
        },
        { status: 200 }
      );
    }

    return Response.json(
      {
        message: `Success get all tasks without status task`,
        statusCode: 200,
        data: submission,
        classes,
      },
      { status: 200 }
    );
  }

  if (status) {
    // Condition incalid status type return bad request with status 400

    if (
      status !== "missing" &&
      status !== "turned-in" &&
      status !== "not-turned-in"
    )
      return Response.json(
        {
          message: `Invalid status task type`,
          statusCode: 400,
        },
        { status: 400 }
      );

    const classes = await db.query.ClassTable.findMany({
      where: arrayContains(ClassTable.students, [session?.user.id as string]),
      columns: {
        code: true,
        className: true,
      },
    });

    const tasks = await db.query.ClassTable.findMany({
      with: {
        submission: {
          where: or(
            eq(SubmissionTable.type, "task"),
            eq(SubmissionTable.type, "test")
          ),
          columns: {
            title: true,
            createdAt: true,
            id: true,
            deadline: true,
          },
        },
      },
      columns: {
        code: true,
        className: true,
      },
      where: and(
        eq(ClassTable.code, code),
        arrayContains(ClassTable.students, [session?.user.id as string])
      ),
    });

    const submission = tasks.flatMap((task) => {
      return task.submission.map((t) => ({ ...t, classCode: task.code }));
    });

    if (status === "turned-in") {
      const data = filterTaskTurnedIn(submission, doneTasks);

      return Response.json(
        {
          message: `Successfully get taska in class with code ${code} with status ${status}`,
          statusCode: 200,
          data,
          classes,
        },
        { status: 200 }
      );
    }

    if (status === "missing") {
      const data = filterTaskMissing(submission, doneTasks);

      return Response.json(
        {
          message: `Successfully get tasks in class with code ${code} with status ${status}`,
          statusCode: 200,
          data,
          classes,
        },
        { status: 200 }
      );
    }

    if (status === "not-turned-in") {
      const data = filterTaskNotTurnedIn(submission, doneTasks);

      return Response.json(
        {
          message: `Successfully get tasks in class with code ${code} with status ${status}`,
          statusCode: 200,
          data,
          classes,
        },
        { status: 200 }
      );
    }
  }

  const tasks = await db.query.ClassTable.findFirst({
    where: eq(ClassTable.code, code),
    columns: {
      code: true,
    },
    with: {
      submission: {
        where: or(
          eq(SubmissionTable.type, "task"),
          eq(SubmissionTable.type, "test")
        ),
        columns: {
          title: true,
          createdAt: true,
          id: true,
          deadline: true,
        },
      },
    },
  });

  const data = tasks?.submission.map((mission) => {
    return {
      ...mission,
      classCode: tasks?.code,
      status: doneTasks.some((task) => task.submissionId === mission.id)
        ? "done"
        : new Date(mission.deadline).getTime() > new Date().getTime()
        ? "assigned"
        : "missing",
    };
  });

  return Response.json(
    {
      message: `Successfully get tasks class with code ${code}`,
      statusCode: 200,
      data,
    },
    { status: 200 }
  );
});

export const POST = auth(async (req) => {
  const url = new URL(req.url);
  const code = url.pathname.split("/").pop() as string;
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
