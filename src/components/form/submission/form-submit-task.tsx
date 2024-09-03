"use client";
import React, { useState } from "react";
import { Button } from "../../ui/button";
import { FaPlus } from "react-icons/fa6";
import CardFile from "@/components/card/card-file";
import { UploadButton } from "@/utils/uploadthing";
import { Files } from "@/types/task";
import { AxiosError } from "axios";
import toast from "react-hot-toast";
import { taskService } from "@/services/task";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { FaCheck } from "react-icons/fa6";

type Props = {
  status: "done" | "assigned" | "missing";
  code: string;
  id: string;
  filesSubmit: Files[];
  idDone: string;
};

const FormSubmitTask = ({ status, code, id, filesSubmit, idDone }: Props) => {
  const [isSuccess, setIsSuccess] = useState(false);
  const [files, setFiles] = useState<Files[]>(filesSubmit || []);
  const [isLoading, setIsLoading] = useState(false);

  const submitTssk = async () => {
    try {
      setIsLoading(true);
      await taskService.submit(code, id, { files });
      setIsSuccess(true);
    } catch (error) {
      const axiosError = error as AxiosError;
      const res = axiosError.response?.data as {
        mesaage: string;
        statusCode: number;
      };
      toast.error(res.mesaage);
    } finally {
      setIsLoading(false);
      location.reload();
    }
  };

  const cancelSubmit = async () => {
    try {
      setIsLoading(true);
      await taskService.cancelSubmit(idDone);
    } catch (error) {
      const axiosError = error as AxiosError;
      const res = axiosError.response?.data as {
        mesaage: string;
        statusCode: number;
      };
      toast.error(res.mesaage);
    } finally {
      setIsLoading(false);
      location.reload();
    }
  };

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
      {isSuccess ? (
        <Alert variant="success">
          <FaCheck className="h-4 w-4" />
          <AlertTitle>Success</AlertTitle>
          <AlertDescription>Success submit task</AlertDescription>
        </Alert>
      ) : null}
      <div className="flex flex-col gap-3">
        {files.map((data, i) => (
          <CardFile
            key={data.keyFile}
            index={i}
            withIcon={status === "done"}
            {...data}
            totalList={files.length}
          />
        ))}
      </div>
      {status === "done" || isSuccess ? (
        <Button
          variant="outline"
          type="button"
          size="lg"
          onClick={cancelSubmit}
          className="font-semibold flex items-center gap-3 disabled:cursor-not-allowed"
        >
          Batalkan pengiriman tugas
        </Button>
      ) : (
        <div className="flex flex-col gap-3">
          <UploadButton
            endpoint="fileUploader"
            disabled={isLoading}
            appearance={{
              allowedContent: "hidden",
              button:
                "w-full text-base font-semibold flex justify-center items-center gap-3 w-full h-10 rounded-md px-8 border border-slate-200 bg-white text-slate-950 shadow-sm hover:bg-slate-100 hover:text-slate-900 dark:border-slate-800 dark:text-slate-100 dark:bg-slate-950 dark:hover:bg-slate-800 dark:hover:text-slate-50 ",
            }}
            onClientUploadComplete={(res) =>
              setFiles((prev) => [
                ...prev,
                ...res.map((data) => ({
                  keyFile: data.key,
                  name: data.name,
                  url: data.url,
                  type:
                    data.type.split("/")[0] === "image"
                      ? "image"
                      : data.key.split(".")[1],
                })),
              ])
            }
            content={{
              button({ ready, isUploading, uploadProgress }) {
                if (!ready) return "Sedang memuat...";
                if (isUploading)
                  return <p className="z-50">Uploading {uploadProgress}%</p>;
                return (
                  <div className="flex items-center gap-2">
                    <FaPlus />
                    <span>Kirim File</span>
                  </div>
                );
              },
            }}
          />
          {files.length > 0 ? (
            <Button
              variant="secondary"
              type="button"
              size="lg"
              className="font-semibold flex items-center gap-3"
              onClick={submitTssk}
              disabled={isLoading}
            >
              Serahkan
            </Button>
          ) : (
            <Button
              variant="secondary"
              type="button"
              size="lg"
              className="font-semibold flex items-center gap-3"
            >
              Tanda sebagai selesai
            </Button>
          )}
        </div>
      )}
    </section>
  );
};

export default FormSubmitTask;
