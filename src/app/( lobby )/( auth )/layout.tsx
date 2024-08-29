import Image from "next/image";
import { ReactNode } from "react";

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <main className="flex items-center justify-center h-dvh">
      <section className="container max-w-7xl lg:grid lg:grid-cols-2 gap-8 lg:h-[90%] h-full rounded-lg">
        <section className="lg:w-full flex h-full items-center justify-center lg:ml-3">
          {children}
        </section>
        <figure className="lg:block hidden w-full h-full relative">
          <Image
            src={"/auth.jpg"}
            alt="Auth"
            fill
            loading="lazy"
            className="w-full h-full object-cover object-center rounded-lg"
          />
        </figure>
      </section>
    </main>
  );
};

export default layout;
