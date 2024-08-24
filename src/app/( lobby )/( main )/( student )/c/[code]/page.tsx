import CardSubjectMatter from "@/components/card/card-subject-matter";
import LayoutClass from "@/layouts/class/layout-class";
import React from "react";

const page = ({ params }: { params: { code: string } }) => {
  return (
    <LayoutClass code={params.code as string}>
      <div className="mt-4 flex flex-col gap-4">
        {Array.from({ length: 10 }).map((_, i) => (
          <CardSubjectMatter key={i} index={i} />
        ))}
      </div>
    </LayoutClass>
  );
};

export default page;
