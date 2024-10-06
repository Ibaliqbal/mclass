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
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
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
  const { data, status } = await classService.detail(params.code);

  if (!session) return redirect("/");

  const statusJoin = data?.data.students.includes(session?.user.id as string);
  console.log(statusJoin);
  
  if (status === 404)
    return (
      <section className="w-full pt-5 pb-10 h-[80dvh] flex items-center justify-center">
        <h2 className="text-2xl font-semibold">Class not found</h2>
      </section>
    );

  return !statusJoin && data.data.instructorId !== session.user.id ? (
    <section className="w-full pt-5 pb-10 h-[80dvh] flex items-center justify-center flex-col">
      <Image
        src={"/enter-class.png"}
        alt="Enter"
        width={500}
        height={500}
        loading="lazy"
      />
      <h2 className="text-2xl font-semibold">
        To get all information for this class, please join first!
      </h2>
    </section>
  ) : (
    <section className="w-full pt-5 pb-10">
      <div
        className="w-full p-3 h-60 rounded-md flex flex-col justify-end mix-blend-difference text-white dark:header_photo"
        style={{
          backgroundImage: `url('${data.data.header_photo}')`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        <h1 className="font-semibold md:text-4xl text-2xl">
          {data.data.className}
        </h1>
        {session?.user.role === "Teacher" ? (
          <h3 className="md:text-sm text-xs">Code: {data.data.code}</h3>
        ) : null}
        <h4 className="mt-3 md:text-lg text-sm">{data.data.instructor.name}</h4>
        <p className="md:text-sm text-xs">
          Mata Pelajaran : {data.data.subject}
        </p>
        <p className="md:text-sm text-xs">Ruang : {data.data.room}</p>
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
                className="fixed md:bottom-10 bottom-5 md:right-10 right-5 z-50 bg-green-500 text-slate-100 shadow hover:bg-green-900/90 dark:bg-green-600 dark:text-slate-100 dark:hover:bg-green-700/90 p-4 rounded-full flex items-center justify-center text-xl"
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
    </section>
  );
};

export default layout;
