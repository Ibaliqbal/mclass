"use client";
import { taskService } from "@/services/task";
import { useQuery } from "@tanstack/react-query";
import NavigationTask from "@/components/task/navigation-task";
import SelectTask from "@/components/task/select-task";
import Loader from "@/components/loader";
import CardTask from "@/components/card/card-task";
import { TSubmission } from "@/lib/db/schema";
import { format } from "date-fns";

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
              {data.data.map(
                (
                  task: Pick<
                    TSubmission,
                    "title" | "createdAt" | "id" | "deadline"
                  > & {
                    classCode: string;
                  },
                  i: number
                ) => (
                  <CardTask
                    key={i}
                    {...{
                      index: i,
                      code: task.classCode,
                      status: "assigned",
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
          </div>
        </>
      )}
    </section>
  );
};

export default TasksNotTurnedInView;
