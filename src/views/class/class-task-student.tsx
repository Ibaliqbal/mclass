"use client";

import CardTask from "@/components/card/card-task";
import Loader from "@/components/loader";
import { TSubmission } from "@/lib/db/schema";
import { taskService } from "@/services/task";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";

const ClassTaskStudent = ({ code }: { code: string }) => {
  const { isLoading, data } = useQuery({
    queryKey: ["class", code, "tasks"],
    queryFn: async () => (await taskService.get(code)).data?.data,
  });

  return isLoading ? (
    <Loader />
  ) : (
    <div className="flex flex-col gap-4 divide-y-2 divide-gray-500">
      {data.map(
        (
          task: Pick<TSubmission, "deadline" | "title" | "id" | "createdAt"> & {
            classCode: string;
            status: "missing" | "assigned" | "done";
          },
          i: number
        ) => (
          <CardTask
            key={i}
            {...{
              index: i,
              code: task.classCode,
              status: task.status,
              createdAt: format(
                new Date(task.createdAt as Date),
                "dd MMMM yyyy"
              ),
              id: task.id,
              title: task.title,
            }}
          />
        )
      )}
    </div>
  );
};

export default ClassTaskStudent;
