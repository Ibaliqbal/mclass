"use client";
import React from "react";
import { Avatar, AvatarImage } from "../ui/avatar";

type Props = {
  students: string[];
  alreadyDone: string[];
};

const ListAlreadySubmitTask = ({ students, alreadyDone }: Props) => {
  return (
    <section className="col-span-2 h-fit w-full p-3 flex flex-col gap-3 rounded-md border-[1px] border-gray-500 shadow-md shadow-black">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold">Alraedy Submit</h3>
        <p
          className={`font-semibold`}
        >{`${alreadyDone.length}/${students.length}`}</p>
      </div>

      <div className="flex flex-col gap-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <div className="flex items-center gap-3" key={i}>
            <Avatar className="w-12 h-12">
              <AvatarImage
                src="/avatar.jpg"
                alt="Avatar"
                width={100}
                height={100}
                className="object-cover object-center rounded-full"
              />
            </Avatar>
            <h4>Iqnbal Muthahhary</h4>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ListAlreadySubmitTask;
