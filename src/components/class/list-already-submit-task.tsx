"use client";
import React from "react";
import CardPeople from "../card/card-people";

type Props = {
  students: string[];
  alreadyDone: string[];
  id: string
};

const ListAlreadySubmitTask = ({ students, alreadyDone, id }: Props) => {
  return (
    <section className="col-span-2 h-fit w-full p-4  flex flex-col gap-3 rounded-md border-[1px] border-gray-500 shadow-md shadow-black">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold">Alraedy Submit</h3>
        <p
          className={`font-semibold`}
        >{`${alreadyDone.length}/${students.length}`}</p>
      </div>

      <div className="flex flex-col gap-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <CardPeople name="Iqbal Muthahahry" avatar="/avatar.jpg" key={i} />
        ))}
      </div>
    </section>
  );
};

export default ListAlreadySubmitTask;
