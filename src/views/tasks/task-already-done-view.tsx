import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import CardFile from "@/components/card/card-file";
import { format } from "date-fns";
import { TDoneTask, TUser } from "../../lib/db/schema";
import MoreOption from "@/components/task/more-option";

const TaskAlreadyDoneView = ({
  data,
}: {
  data: Array<
    Pick<TDoneTask, "id" | "createdAt" | "files" | "point"> &
      Pick<TUser, "avatar" | "name">
  >;
}) => {
  return (
    <section className="container max-w-6xl mt-5 flex flex-col gap-4">
      {data.map((task) => (
        <section className="flex gap-5" key={task.id}>
          <Avatar className="w-14 h-14 lg:block hidden">
            <AvatarImage
              src={
                task.avatar
                  ? task.avatar
                  : `https://ui-avatars.com/api/?name=${task.name}&background=random&color=#fff`
              }
              alt="Avatar"
              loading="lazy"
              className="w-full h-full object-cover object-center"
            />
            <AvatarFallback>{task.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="grow flex flex-col gap-4">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div>
                <h3>{task.name}</h3>
                <p className="text-gray-500 text-sm">
                  {format(new Date(task.createdAt as Date), "dd MMMM yyyy")}
                </p>
              </div>
              <MoreOption point={task.point} id={task.id} />
            </div>
            <div className="grid md:grid-cols-3 grid-cols-2 gap-3">
              {task.files?.map((file, index) => (
                <CardFile
                  index={index}
                  key={file.keyFile}
                  withIcon
                  totalList={task.files?.length || 0}
                  {...file}
                />
              ))}
            </div>
          </div>
        </section>
      ))}
    </section>
  );
};

export default TaskAlreadyDoneView;
