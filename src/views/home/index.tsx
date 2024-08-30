"use client";
import CardClass from "@/components/card/card-class";
import Loader from "@/components/loader";
import { classService } from "@/services/class";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import Image from "next/image";

const HomeView = () => {
  const { error, isError, isLoading } = useQuery({
    queryKey: ["classes"],
    queryFn: async () => (await classService.get()).data?.classes,
  });

  return isLoading ? (
    <Loader />
  ) : isError && (error as AxiosError).status === 401 ? (
    <div className="flex items-center justify-center gap-3 flex-col h-[70dvh]">
      <Image
        src="/login-first.png"
        alt="Login First"
        width={300}
        height={300}
      />
      <p className="text-xl font-semibold">Please Login First</p>
    </div>
  ) : (
    <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-3">
      {Array.from({ length: 20 }).map((_, i) => (
        <CardClass key={i} i={i} />
      ))}
    </div>
  );
};

export default HomeView;
