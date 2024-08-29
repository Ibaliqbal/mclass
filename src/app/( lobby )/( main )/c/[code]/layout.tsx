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
        className="w-full p-3 h-60 rounded-md flex flex-col justify-end text-white mix-blend-difference dark:header_photo"
        style={{
          backgroundImage: "url('/header_1.jpeg')",
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        <h1 className="font-semibold text-4xl">PRE_XII EI 2</h1>
        {session?.user.role === "Teacher" ? (
          <h2 className="text-sm">Code: Hgaui19</h2>
        ) : null}
        <h4 className="mt-3 text-lg">Tika Setiawati</h4>
        <p>Mata Pelajaran : Rekayasa Perangkat Lunak</p>
        <p>Ruang : 302</p>
      </div>
      <Separator className="mt-3" />
      <NavigationClass code={params.code} />
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
