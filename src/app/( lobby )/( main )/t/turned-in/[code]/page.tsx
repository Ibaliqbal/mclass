import TasksTurendInView from "@/views/tasks/tasks-turned-in-view";

const page = async ({ params }: { params: { code: string } }) => {

  return (
    <TasksTurendInView code={params.code} />
  );
};

export default page;
