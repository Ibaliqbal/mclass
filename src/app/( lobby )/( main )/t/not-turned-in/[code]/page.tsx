import TasksNotTurnedInView from "@/views/tasks/tasks-not-turned-in-view";

const page = async ({ params }: { params: { code: string } }) => {
  return <TasksNotTurnedInView code={params.code} />;
};

export default page;
