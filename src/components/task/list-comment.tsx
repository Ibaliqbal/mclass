"use client";
import { taskService } from "@/services/task";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import CustomImage from "../image";
import { TComment, TUser } from "@/lib/db/schema";
import { format } from "date-fns";

type Props = {
  id: string;
};

const ListComments = ({ id }: Props) => {
  const { data, isLoading } = useQuery({
    queryKey: ["comments task", id],
    queryFn: async () => (await taskService.getComment(id)).data?.data,
    enabled: !!id, // Only fetch if id is provided
    staleTime: 60 * 1000,
  });
  return isLoading ? (
    <div className="w-full min-h-[100px] flex justify-center items-center">
      <div className="loader w-[35px]" />
    </div>
  ) : data.length > 0 ? (
    <section className="my-4 flex flex-col gap-4">
      {data.map(
        (
          comment: Pick<TComment, "id" | "createdAt" | "content"> &
            Pick<TUser, "avatar" | "name">
        ) => (
          <div className="flex gap-3" key={comment.id}>
            <CustomImage
              src={
                comment.avatar
                  ? comment.avatar
                  : `https://ui-avatars.com/api/?name=${comment.name}&background=random&color=#fff`
              }
              alt="Avatar"
              width={70}
              height={70}
              className="object-cover object-center rounded-full w-12 aspect-square"
            />
            <div className="flex flex-col gap-2 grow">
              <div className="flex gap-3 items-center">
                <h2>{comment.name}</h2>
                <p className="text-gray-500 text-sm">
                  {format(new Date(comment.createdAt), "dd MMMM yyyy")}
                </p>
              </div>
              <p>{comment.content}</p>
            </div>
          </div>
        )
      )}
    </section>
  ) : null;
};

export default ListComments;
