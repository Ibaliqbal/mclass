"use client";
import CardTask from "@/components/card/card-task";
import Loader from "@/components/loader";
import NavigationTask from "@/components/task/navigation-task";
import SelectTask from "@/components/task/select-task";
import { TSubmission } from "@/lib/db/schema";
import { taskService } from "@/services/task";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";

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
                      status: "done",
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

export default TasksTurendInView;
