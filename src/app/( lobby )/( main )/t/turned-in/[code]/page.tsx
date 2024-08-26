import CardSubjectMatter from "@/components/card/card-subject-matter";
import NavigationTask from "@/components/task/navigation-task";
import SelectTask from "@/components/task/select-task";
import React from "react";

const page = ({ params }: { params: { code: string } }) => {
  return (
    <section>
      <NavigationTask code={params.code} />
      <div className="container max-w-4xl mt-4 pt-4 pb-10">
        <SelectTask value={params.code} type="turned-in" />
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
