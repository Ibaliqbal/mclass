"use client";

import CardTask from "@/components/card/card-task";
import Loader from "@/components/loader";
import { taskService } from "@/services/task";
import { useQuery } from "@tanstack/react-query";

const ClassTaskStudent = ({ code }: { code: string }) => {
  const { isLoading } = useQuery({
    queryKey: ["class", code, "tasks"],
    queryFn: async () => (await taskService.get(code)).data?.data,
  });

  return isLoading ? (
    <Loader />
  ) : (
    <div className="flex flex-col gap-4 divide-y-2 divide-gray-500">
      {Array.from({ length: 10 }).map((_, i) => (
        <CardTask key={i} index={i} />
      ))}
    </div>
  );
};

export default ClassTaskStudent;
