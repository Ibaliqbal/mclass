"use client";
import { taskService } from "@/services/task";
import { useQuery } from "@tanstack/react-query";
import CardSubjectMatter from "@/components/card/card-subject-matter";
import NavigationTask from "@/components/task/navigation-task";
import SelectTask from "@/components/task/select-task";
import Loader from "@/components/loader";

const TasksNotTurnedInView = ({ code }: { code: string }) => {
  const { isLoading, data } = useQuery({
    queryKey: ["tasksNotTurnedIn", code],
    queryFn: async () =>
      (await taskService.getByStatus(code, "not-turned-in")).data,
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
              type="not-turned-in"
              listClass={data.classes}
            />
            <div className="mt-4 flex flex-col gap-4">
              {Array.from({ length: 10 }).map((_, i) => (
                <CardSubjectMatter key={i} index={i} />
              ))}
            </div>
          </div>
        </>
      )}
    </section>
  );
};

export default TasksNotTurnedInView;
