"use client";
import CardClass from "@/components/card/card-class";
import Loader from "@/components/loader";
import { TClass } from "@/lib/db/schema";
import { classService } from "@/services/class";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import Image from "next/image";

const HomeView = () => {
  const { error, isError, isLoading, data } = useQuery({
    queryKey: ["classes"],
    queryFn: async () => (await classService.get()).data?.classes,
  });

  if (isLoading) return <Loader />;

  if (isError && (error as AxiosError).status === 401)
    return (
      <div className="flex items-center justify-center gap-3 flex-col h-[70dvh]">
        <Image
          src="/login-first.png"
          alt="Login First"
          width={300}
          height={300}
        />
        <p className="text-xl font-semibold">Please Login First</p>
      </div>
    );

  return (
    <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-3">
      {data?.map(
        (
          classItem: Pick<
            TClass,
            "className" | "code" | "header_photo" | "subject"
          > & {
            instructor: {
              name: string;
              avatar: string | null;
            };
          },
          i: number
        ) => (
          <CardClass key={classItem.code} i={i} {...classItem} />
        )
      )}
    </div>
  );
};

export default HomeView;
