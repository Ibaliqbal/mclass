import CardSubjectMatter from "@/components/card/card-subject-matter";
import NavigationTask from "@/components/task/navigation-task";
import SelectTask from "@/components/task/select-task";
import { taskService } from "@/services/task";
import React from "react";

const page = async ({ params }: { params: { code: string } }) => {
  const { data } = await taskService.getByStatus(params.code, "not-turned-in");

  return (
    <section>
      <NavigationTask code={params.code} />
      <div className="container max-w-4xl mt-4 pt-4 pb-10">
        <SelectTask value={params.code} type="not-turned-in" listClass={data.classes} />
        <div className="mt-4 flex flex-col gap-4">
          {Array.from({ length: 10 }).map((_, i) => (
            <CardSubjectMatter key={i} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default page;
