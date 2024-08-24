
import CardTask from "@/components/card/card-task";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import React from "react";

const page = ({ params }: { params: { code: string } }) => {
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
      <div className="flex flex-col gap-4 divide-y-2 divide-gray-500">
        {Array.from({ length: 10 }).map((_, i) => (
          <CardTask key={i} index={i} />
        ))}
      </div>
    </div>
  );
};

export default page;
