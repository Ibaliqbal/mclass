import NavigationClass from "@/components/class/navigation-class";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { auth } from "@/lib/auth";
import { classService } from "@/services/class";
import Link from "next/link";
import { ReactNode } from "react";
import { FaPlus } from "react-icons/fa6";

const layout = async ({
  children,
  params,
}: {
  params: { code: string };
  children: ReactNode;
}) => {
  const session = await auth();
  const { data } = await classService.detail(params.code);

  const statusJoin = data?.data.students.includes(session?.user.id as string);

  return (
    <div className="w-full pt-5 pb-10">
      <div
        className="w-full p-3 h-60 rounded-md flex flex-col justify-end mix-blend-difference text-white dark:header_photo"
        style={{
          backgroundImage: `url('${data.data.header_photo}')`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        <h1 className="font-semibold text-4xl">{data.data.className}</h1>
        {session?.user.role === "Teacher" ? (
          <h2 className="text-sm">Code: {data.data.code}</h2>
        ) : null}
        <h4 className="mt-3 text-lg">{data.data.instructor.name}</h4>
        <p>Mata Pelajaran : {data.data.subject}</p>
        <p>Ruang : {data.data.room}</p>
      </div>
      <Separator className="mt-3" />
      <NavigationClass
        code={params.code}
        role={session?.user.role as "Teacher" | "Student"}
      />
      {children}
      {session?.user.role === "Teacher" ? (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href={`/c/${params.code}/create`}
                aria-label="add new mission"
                className="fixed bottom-10 right-10 z-50 bg-green-500 text-slate-100 shadow hover:bg-green-900/90 dark:bg-green-600 dark:text-slate-100 dark:hover:bg-green-700/90 p-4 rounded-full flex items-center justify-center text-xl"
              >
                <FaPlus />
              </Link>
            </TooltipTrigger>
            <TooltipContent>
              <p>Craete some task to your class</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ) : null}
    </div>
  );
};

export default layout;
