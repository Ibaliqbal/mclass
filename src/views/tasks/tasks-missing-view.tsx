"use client";
import { taskService } from "@/services/task";
import { useQuery } from "@tanstack/react-query";
import NavigationTask from "@/components/task/navigation-task";
import SelectTask from "@/components/task/select-task";
import Loader from "@/components/loader";
import CardTask from "@/components/card/card-task";

const TasksMissingView = ({ code }: { code: string }) => {
  const { isLoading, data } = useQuery({
    queryKey: ["tasksMissing", code],
    queryFn: async () => (await taskService.getByStatus(code, "missing")).data,
  });
  return (
    <section>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <NavigationTask code={code} />
          <div className="container max-w-4xl mt-4 pt-4 pb-10">
            <SelectTask value={code} type="missing" listClass={data.classes} />
            <div className="mt-4 flex flex-col gap-4">
              {Array.from({ length: 10 }).map((_, i) => (
                <CardTask key={i} index={i} />
              ))}
            </div>
          </div>
        </>
      )}
    </section>
  );
};

export default TasksMissingView;
