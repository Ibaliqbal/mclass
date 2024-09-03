"use client";
import React from "react";
import { Button } from "../../ui/button";
import { FaPlus } from "react-icons/fa6";
import CardFile from "@/components/card/card-file";
import { UploadButton } from "@/utils/uploadthing";
import { useRouter } from "next/navigation";

type Props = {
  status: "done" | "assigned" | "missing";
};

const FormSubmitTask = ({ status }: Props) => {
  const router = useRouter();
  return (
    <section className="col-span-2 h-fit w-full p-3 flex flex-col gap-3 rounded-md border-[1px] border-gray-500 shadow-md shadow-black">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold">Tugas</h3>
        <p
          className={`${
            status === "assigned"
              ? "text-green-500"
              : status === "missing"
              ? "text-red-600"
              : ""
          } font-semibold`}
        >
          {status === "assigned"
            ? "Ditugaskan"
            : status === "done"
            ? "Diserahkan"
            : "Belum Diserahkan"}
        </p>
      </div>
      <div className="flex flex-col gap-3">
        {/* <CardFile index={1} icon="delete" type={"pdf"} />
        <CardFile index={1} icon="delete" type={"pdf"} />
        <CardFile index={1} icon="delete" type={"pdf"} />
        <CardFile index={1} icon="delete" type={"pdf"} /> */}
      </div>
      {status === "done" ? (
        <Button
          variant="outline"
          size="lg"
          className="font-semibold flex items-center gap-3"
        >
          Batalkan pengiriman tugas
        </Button>
      ) : (
        <div className="flex flex-col gap-3">
          <UploadButton
            endpoint="fileUploader"
            appearance={{
              allowedContent: "hidden",
              button:
                "w-full text-base font-semibold flex justify-center items-center gap-3 w-full h-10 rounded-md px-8 border border-slate-200 bg-white text-slate-950 shadow-sm hover:bg-slate-100 hover:text-slate-900 dark:border-slate-800 dark:text-slate-100 dark:bg-slate-950 dark:hover:bg-slate-800 dark:hover:text-slate-50 ",
            }}
            content={{
              button({ ready }) {
                if (!ready) return "Sedang memuat...";
                return (
                  <div className="flex items-center gap-2">
                    <FaPlus />
                    <span>Kirim File</span>
                  </div>
                );
              },
            }}
          />
          <Button
            variant="secondary"
            size="lg"
            className="font-semibold flex items-center gap-3"
          >
            Tanda sebagai selesai
          </Button>
        </div>
      )}
    </section>
  );
};

export default FormSubmitTask;
