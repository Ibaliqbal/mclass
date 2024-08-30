import CardSubjectMatter from "@/components/card/card-subject-matter";
import ClassCreateView from "@/views/class/class-create-view";
import React from "react";

const page = ({ params }: { params: { code: string } }) => {
  return <ClassCreateView code={params.code} />;
};

export default page;
