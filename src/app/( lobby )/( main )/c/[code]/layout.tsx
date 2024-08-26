import NavigationClass from "@/components/class/navigation-class";
import { Separator } from "@/components/ui/separator";
import React, { ReactNode } from "react";

const layout = ({
  children,
  params,
}: {
  params: { code: string };
  children: ReactNode;
}) => {
  const role: string = "teacher";
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
        {role === "teacher" ? <h2 className="text-sm">Code: Hgaui19</h2> : null}
        <h4 className="mt-3 text-lg">Tika Setiawati</h4>
        <p>Mata Pelajaran : Rekayasa Perangkat Lunak</p>
        <p>Ruang : 302</p>
      </div>
      <Separator className="mt-3" />
      <NavigationClass code={params.code} />
      {children}
    </div>
  );
};

export default layout;
