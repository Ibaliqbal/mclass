import Image from "next/image";
import { ReactNode } from "react";

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <main className="flex items-center justify-center h-dvh">
      <section className="container max-w-7xl grid grid-cols-2 gap-8 h-[90dvh] rounded-lg">
        <section className="w-full flex justify-center ml-3">{children}</section>
        <figure className="w-full h-full relative">
          <Image
            src={"/auth.jpg"}
            alt="Auth"
            fill
            className="w-full h-full object-cover object-center rounded-lg"
          />
        </figure>
      </section>
    </main>
  );
};

export default layout;
