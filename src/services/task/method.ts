export function filterTaskTurnedIn(
  tasks: Array<{
    classCode: string;
    id: string;
    createdAt: Date | null;
    title: string;
  }>,
  done: {
    submissionId: string;
  }[]
) {
  return tasks.filter((task) =>
    done.some((s) => s.submissionId.includes(task.id))
  );
}

export function filterTaskMissing(
  tasks: Array<{
    classCode: string;
    id: string;
    createdAt: Date | null;
    title: string;
  }>,
  done: {
    submissionId: string;
  }[]
) {
  const today = new Date();
  return tasks
    .filter((task) => !done.some((s) => s.submissionId.includes(task.id)))
    .filter(
      (task) =>
        task.createdAt && new Date(task.createdAt).getTime() < today.getTime()
    );
}

export function filterTaskNotTurnedIn(
  tasks: Array<{
    classCode: string;
    id: string;
    createdAt: Date | null;
    title: string;
  }>,
  done: {
    submissionId: string;
  }[]
) {
  const today = new Date();
  return tasks
    .filter((task) => !done.some((s) => s.submissionId.includes(task.id)))
    .filter(
      (task) =>
        task.createdAt && new Date(task.createdAt).getTime() > today.getTime()
    );
}
