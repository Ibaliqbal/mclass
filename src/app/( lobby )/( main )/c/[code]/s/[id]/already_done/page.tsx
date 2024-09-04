import { taskService } from "@/services/task";
import TaskAlreadyDoneView from "@/views/tasks/task-already-done-view";

const page = async ({ params }: { params: { code: string; id: string } }) => {
  const { code, id } = params;
  const data = (await taskService.done(id)).data?.data;
  return <TaskAlreadyDoneView data={data} />;
};

export default page;
