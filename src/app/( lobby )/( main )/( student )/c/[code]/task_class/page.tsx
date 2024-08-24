import CardSubjectMatter from "@/components/card/card-subject-matter";
import NavigationClass from "@/components/class/navigation-class";
import { Separator } from "@/components/ui/separator";
import React from "react";

const page = ({ params }: { params: { code: string } }) => {
  return (
    <div className="w-full pt-5 pb-10">
      <div
        className="w-full p-3 h-52 rounded-md flex flex-col justify-end text-white mix-blend-difference"
        style={{
          backgroundImage: "url('/header_1.jpeg')",
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        <h1 className="font-semibold text-4xl">PRE_XII EI 2</h1>
        <h4 className="mt-2 text-lg">Tika Setiawati</h4>
        <p>Mata Pelajaran : Rekayasa Perangkat Lunak</p>
        <p>Ruang : 302</p>
      </div>
      <Separator className="mt-3" />
      <NavigationClass code={params.code as string} />
      <div className="mt-4 flex flex-col gap-4">
        {Array.from({ length: 10 }).map((_, i) => (
          <CardSubjectMatter key={i} index={i} />
        ))}
      </div>
    </div>
  );
};

export default page;
