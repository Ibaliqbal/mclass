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
import { useQuery, useQueryClient } from "@tanstack/react-query";

type Props = {
  id: string;
};

const FormSubmitTask = ({ id }: Props) => {
  const { data, isLoading } = useQuery({
    queryKey: ["task", "status", id],
    queryFn: async () =>
      (await taskService.status(id)).data?.data as {
        files: Files[];
        status: "done" | "assigned" | "missing";
        idDone: string;
      },
    staleTime: 10 * 60 * 1000, // 1 minute
  });
  const queryClient = useQueryClient();
  const [isSuccess, setIsSuccess] = useState(false);
  const [files, setFiles] = useState<Files[]>(data?.files || []);
  const [loading, setLoading] = useState(false);

  const submitTssk = async () => {
    try {
      setLoading(true);
      await taskService.submit(id, { files });
      setIsSuccess(true);
    } catch (error) {
      const axiosError = error as AxiosError;
      const res = axiosError.response?.data as {
        mesaage: string;
        statusCode: number;
      };
      toast.error(res.mesaage);
    } finally {
      setLoading(false);
      queryClient.invalidateQueries({ queryKey: ["task", "status", id] });
    }
  };

  const cancelSubmit = async () => {
    if (!data?.idDone) return toast.error("Invalid id");
    try {
      setLoading(true);
      await taskService.deleteSubmitTask(data.idDone);
    } catch (error) {
      const axiosError = error as AxiosError;
      const res = axiosError.response?.data as {
        mesaage: string;
        statusCode: number;
      };
      toast.error(res.mesaage);
    } finally {
      setLoading(false);
      queryClient.invalidateQueries({ queryKey: ["task", "status", id] });
    }
  };

  return isLoading ? (
    <section className="col-span-2 w-full h-[200px] flex items-center justify-center rounded-md border-[1px] border-gray-500 shadow-md shadow-black">
      <div className="loader w-[40px]" />
    </section>
  ) : (
    <section className="col-span-2 h-fit w-full p-3 flex flex-col gap-3 rounded-md border-[1px] border-gray-500 shadow-md shadow-black">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold">Tugas</h3>
        <p
          className={`${
            data?.status === "assigned"
              ? "text-green-500"
              : data?.status === "missing"
              ? "text-red-600"
              : ""
          } font-semibold`}
        >
          {data?.status === "assigned"
            ? "Ditugaskan"
            : data?.status === "done"
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
        {data?.files.length ?? 0 > 0
          ? data?.files.map((done: Files, i: number) => (
              <CardFile
                key={done.keyFile}
                index={i}
                withIcon={data?.status === "done"}
                {...done}
                totalList={data.files.length}
              />
            ))
          : files.map((done: Files, i: number) => (
              <CardFile
                key={done.keyFile}
                index={i}
                withIcon={data?.status === "done"}
                {...done}
                totalList={files.length}
              />
            ))}
      </div>
      {data?.status === "done" || isSuccess ? (
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
            disabled={loading}
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
              disabled={loading}
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
