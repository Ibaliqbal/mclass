import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { UserTable } from "@/lib/db/schema";
import ClassTaskStudent from "@/views/class/class-task-student";
import ClassTaskTeacherView from "@/views/class/class-task-teacher-view";
import { eq } from "drizzle-orm";
import React from "react";
import { seo } from "@/utils/helper";
import type { Metadata } from "next";

export const generateMetadata = ({
  params,
}: {
  params: { code: string };
}): Metadata => {
  return seo(
    `All Tasks for Class ${params.code} - View and manage class assignments`,
    `This page provides a comprehensive overview of all tasks for class ${params.code}, including details on deadlines, submission status, and materials.`,
    `/c/${params.code}/t`
  );
};

const page = async ({ params }: { params: { code: string } }) => {
  const session = await auth();
  const user = await db.query.UserTable.findFirst({
    where: eq(UserTable.id, session?.user.id as string),
    columns: {
      password: false,
    },
  });
  return (
    <div className="container mt-4 max-w-4xl pt-4 pb-10 flex flex-col gap-4">
      <div className="flex gap-3 items-center">
        <Avatar className="w-20 h-20">
          <AvatarImage
            src={
              user?.avatar
                ? user.avatar
                : `https://ui-avatars.com/api/?name=${user?.name.charAt(
                    0
                  )}&background=random&color=#fff`
            }
            width={100}
            height={100}
            alt="Avatar"
            className="object-cover object-center"
          />
          <AvatarFallback>{user?.name.charAt(0).toUpperCase()}</AvatarFallback>
        </Avatar>
        <h1 className="text-2xl">{user?.name}</h1>
      </div>
      <Separator />
      {session?.user.role === "Teacher" ? (
        <ClassTaskTeacherView code={params.code} />
      ) : (
        <ClassTaskStudent code={params.code} />
      )}
    </div>
  );
};

export default page;
