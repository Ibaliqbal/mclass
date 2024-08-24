import React from "react";
import { Button } from "../../ui/button";
import { FaPlus } from "react-icons/fa6";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import CardFile from "@/components/card/card-file";

const FormSubmitTask = () => {
  return (
    <section className="col-span-2 h-fit w-full p-3 flex flex-col gap-3 rounded-md border-[1px] border-gray-500 shadow-md shadow-black">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold">Tugas</h3>
        <p className="text-green-500 font-semibold">Ditugaskan</p>
      </div>
      <div className="flex flex-col gap-3">
        <CardFile index={1} />
        <CardFile index={1} />
        <CardFile index={1} />
        <CardFile index={1} />
      </div>
      <div className="w-full">
        <Label
          htmlFor="import_task"
          className="font-semibold flex justify-center items-center gap-3 w-full h-10 rounded-md px-8 border border-slate-200 bg-white shadow-sm hover:bg-slate-100 hover:text-slate-900 dark:border-slate-800 dark:bg-slate-950 dark:hover:bg-slate-800 dark:hover:text-slate-50 cursor-pointer"
        >
          <FaPlus />
          Kirim Tugas
        </Label>
        <Input
          type="file"
          id="import_task"
          className="hidden"
          accept=".png,.jpg,.pdf,.doc,.docx,.xlsx,.pptx"
        />
      </div>
      <Button
        variant="secondary"
        size="lg"
        className="font-semibold flex items-center gap-3"
      >
        Tanda sebagai selesai
      </Button>
      <Button
        variant="outline"
        size="lg"
        className="font-semibold flex items-center gap-3"
      >
        Batalkan pengiriman tugas
      </Button>
    </section>
  );
};

export default FormSubmitTask;
