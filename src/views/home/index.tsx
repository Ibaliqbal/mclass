"use client";
import CardClass from "@/components/card/card-class";
import { classService } from "@/services/class";
import { useQuery } from "@tanstack/react-query";

const HomeView = () => {
  const { error } = useQuery({
    queryKey: ["classes"],
    queryFn: async () => (await classService.get()).data?.classes,
  });

  console.log(error?.message);
  return (
    <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-3">
      {Array.from({ length: 20 }).map((_, i) => (
        <CardClass key={i} i={i} />
      ))}
    </div>
  );
};

export default HomeView;
