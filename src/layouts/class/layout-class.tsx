import NavigationClass from "@/components/class/navigation-class";
import { Separator } from "@/components/ui/separator";
import { ReactNode } from "react";

const LayoutClass = ({
  code,
  children,
}: {
  code: string;
  children: ReactNode;
}) => {
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
        <h4 className="mt-2 text-lg">Tika Setiawati</h4>
        <p>Mata Pelajaran : Rekayasa Perangkat Lunak</p>
        <p>Ruang : 302</p>
      </div>
      <Separator className="mt-3" />
      <NavigationClass code={code} />
      {children}
    </div>
  );
};

export default LayoutClass;
