import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { auth } from "@/lib/auth";
import ClassTaskStudent from "@/views/class/class-task-student";
import React from "react";

const page = async ({ params }: { params: { code: string } }) => {
  const session = await auth()
  return (
    <div className="container mt-4 max-w-4xl pt-4 pb-10 flex flex-col gap-4">
      <div className="flex gap-3 items-center">
        <Avatar className="w-20 h-20">
          <AvatarImage
            src="/avatar.jpg"
            width={100}
            height={100}
            alt="Avatar"
            className="object-cover object-center"
          />
        </Avatar>
        <h1 className="text-2xl">Iqbal Muthahhary</h1>
      </div>
      <Separator />
      <ClassTaskStudent code={params.code} />
    </div>
  );
};

export default page;
