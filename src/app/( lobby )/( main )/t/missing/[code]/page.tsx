import TasksMissingView from "@/views/tasks/tasks-missing-view";

const page = ({ params }: { params: { code: string } }) => {
  // console.log(data?.message, data?.data);

  return <TasksMissingView code={params.code} />;
};

export default page;
