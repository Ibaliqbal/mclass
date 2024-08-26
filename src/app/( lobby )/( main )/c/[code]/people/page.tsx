import CardSubjectMatter from "@/components/card/card-subject-matter";

const page = ({ params }: { params: { code: string } }) => {
  return (
    <div className="mt-4 flex flex-col gap-4 max-w-6xl container">
      {Array.from({ length: 10 }).map((_, i) => (
        <CardSubjectMatter key={i} index={i} />
      ))}
    </div>
  );
};

export default page;
