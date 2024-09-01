"use client";
import CardTask from "@/components/card/card-task";
import Loader from "@/components/loader";
import NavigationTask from "@/components/task/navigation-task";
import SelectTask from "@/components/task/select-task";
import { taskService } from "@/services/task";
import { useQuery } from "@tanstack/react-query";

const TasksTurendInView = ({ code }: { code: string }) => {
  const { isLoading, data } = useQuery({
    queryKey: ["tasksTurendIn", code],
    queryFn: async () =>
      (await taskService.getByStatus(code, "turned-in")).data,
  });
  return (
    <section>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <NavigationTask code={code} />
          <div className="container max-w-4xl mt-4 pt-4 pb-10">
            <SelectTask
              value={code}
              type="turned-in"
              listClass={data.classes}
            />
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

export default TasksTurendInView;
