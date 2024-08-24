import CardFile from "@/components/card/card-file";
import { Separator } from "@/components/ui/separator";
import React from "react";
import LayoutSubmission from "@/layouts/submission/layout-submission";

const page = ({ params }: { params: { code: string; id: string } }) => {
  console.log(params.id);

  return (
    <LayoutSubmission
      title="Tugas ke 10"
      dateCreated="Tika Setiawati ~ 3 Januri 2020"
      deadline="20 Februari 2020"
      point={100}
      type="task"
    >
      <div className="flex flex-col gap-3">
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolor
          placeat sequi dolore sunt expedita, voluptatem temporibus voluptatum
          cupiditate fuga blanditiis.
        </p>
        <div className="grid grid-cols-4 gap-3 my-3">
          {Array.from({ length: 20 }).map((_, i) => (
            <CardFile key={i} index={i} />
          ))}
        </div>
      </div>
      <Separator />
    </LayoutSubmission>
  );
};

export default page;
