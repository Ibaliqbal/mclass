"use client";
import React from "react";
import CardPeople from "../card/card-people";
import { useQuery } from "@tanstack/react-query";
import { taskService } from "@/services/task";
import Link from "next/link";
import { Files } from "@/types/task";

type Props = {
  students: string[];
  id: string;
  code: string;
};

const ListAlreadySubmitTask = ({ students, id, code }: Props) => {
  const { isLoading, data } = useQuery({
    queryKey: ["class", id, "students", "done task"],
    queryFn: async () => (await taskService.done(id)).data?.data,
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
  return (
    <section className="col-span-2 h-fit w-full p-4  flex flex-col gap-3 rounded-md border-[1px] border-gray-500 shadow-md shadow-black">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold">Alraedy Submit</h3>
        <p className={`font-semibold`}>{`${data?.length || 0}/${
          students.length
        }`}</p>
      </div>

      {isLoading ? (
        <div className="w-full min-h-[200px] flex justify-center items-center">
          <div className="loader w-[40px]" />
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {data.map(
            (
              done: {
                id: string;
                files: Files[];
                createdAt: Date;
                point: number;
                avatar: string;
                name: string;
              },
              i: number
            ) => (
              <CardPeople
                name={done.name}
                avatar={done.avatar}
                key={done.id}
                withBorder={false}
              />
            )
          )}
          <Link
            href={`/c/${code}/s/${id}/already_done`}
            className="text-blue-600 hover:underline self-end"
          >
            See more
          </Link>
        </div>
      )}
    </section>
  );
};

export default ListAlreadySubmitTask;
