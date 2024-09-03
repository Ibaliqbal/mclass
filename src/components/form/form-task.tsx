"use client";
import { FaCheck } from "react-icons/fa";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { FaCalendarAlt } from "react-icons/fa";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

import { UploadDropzone } from "@/utils/uploadthing";
import CardFile from "@/components/card/card-file";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { UseFormReturn } from "react-hook-form";
import { TTask } from "@/types/task";

type Props = {
  form: UseFormReturn<TTask, any, undefined>;
  success: string;
  onSubmit: (data: TTask) => Promise<void>;
  textBtn: string
  title: string
};

const FormTask = ({ form, success, onSubmit, textBtn, title }: Props) => {
  return (
    <Form {...form}>
      <form
        className="mt-4 flex flex-col gap-5 container max-w-6xl"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <h1 className="text-xl font-semibold mb-3">{title}</h1>
        {success ? (
          <Alert variant="success" className="mb-2">
            <FaCheck className="h-5 w-5" />
            <AlertTitle className="text-lg">Success</AlertTitle>
            <AlertDescription className="text-sm">{success}</AlertDescription>
          </Alert>
        ) : null}
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem className="flex gap-2 flex-col">
              <FormLabel className="md:text-lg text-sm">Title</FormLabel>
              <FormControl>
                <Input
                  disabled={form.formState.isSubmitting}
                  className="md:text-lg text-sm md:py-5 py-4 border-2 border-slate-700 focus:outline-none"
                  placeholder="Input your title task..."
                  {...field}
                />
              </FormControl>
              <FormMessage />
              <FormDescription className="text-sm text-gray-500">
                What do you want to call this task? Give it a catchy title!
              </FormDescription>{" "}
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem className="flex gap-2 flex-col">
              <FormLabel className="md:text-lg text-sm">Description</FormLabel>
              <FormControl>
                <Textarea
                  disabled={form.formState.isSubmitting}
                  className="md:text-lg text-sm py-3 border-2 border-slate-700 focus:outline-none resize-none h-48"
                  placeholder="Input your title task..."
                  {...field}
                />
              </FormControl>
              <FormMessage />
              <FormDescription className="text-sm text-gray-500">
                Share the details! What’s this task all about?
              </FormDescription>{" "}
            </FormItem>
          )}
        />
        <div className="grid grid-cols-2 gap-3">
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem className="flex gap-2 flex-col">
                <FormLabel className="md:text-lg text-sm">Type</FormLabel>
                <FormControl>
                  <Select
                    value={field.value}
                    onValueChange={(value) => field.onChange(value)}
                    disabled={form.formState.isSubmitting}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select type for this task..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="material">Material</SelectItem>
                      <SelectItem value="task">Task</SelectItem>
                      <SelectItem value="test">Test</SelectItem>
                      <SelectItem value="presence">Presence</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
                <FormDescription className="text-sm text-gray-500">
                  What kind of task is this? Choose wisely!
                </FormDescription>{" "}
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="deadline"
            render={({ field }) => (
              <FormItem className="flex flex-col gap-1">
                <FormLabel className="md:text-lg text-sm">Deadline</FormLabel>
                <Popover>
                  <PopoverTrigger
                    asChild
                    disabled={form.formState.isSubmitting}
                  >
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full pl-3 py-5 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <FaCalendarAlt className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="center">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      initialFocus
                      disabled={(date) =>
                        date <= new Date() || date < new Date("1900-01-01")
                      }
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
                <FormDescription className="text-sm text-gray-500">
                  When do you want this task to be completed? Pick a date!
                </FormDescription>{" "}
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="files"
          render={({ field }) => (
            <FormItem className="flex gap-2 flex-col">
              <FormLabel className="md:text-lg text-sm">Files</FormLabel>
              <FormControl>
                <div className="flex flex-col gap-4">
                  <div className="grid grid-cols-4 gap-3">
                    {field.value &&
                      field.value?.map((file, i) => (
                        <CardFile
                          key={file.keyFile}
                          index={i}
                          withIcon={false}
                          {...file}
                          totalList={field.value?.length}
                        />
                      ))}
                  </div>
                  <div className="rounded-xl border dark:border-white border-black">
                    <UploadDropzone
                      endpoint="fileUploader"
                      disabled={form.formState.isSubmitting}
                      appearance={{
                        allowedContent: "hidden",
                      }}
                      onClientUploadComplete={(res) => {
                        field.value
                          ? field.onChange([
                              ...field.value,
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
                          : field.onChange([
                              ...res.map((data) => ({
                                keyFile: data.key,
                                name: data.name,
                                url: data.url,
                                type:
                                  data.type.split("/")[0] === "image"
                                    ? "image"
                                    : data.type.split("/")[0] === "video"
                                    ? "video"
                                    : data.key.split(".")[1],
                              })),
                            ]);
                      }}
                    />
                  </div>
                </div>
              </FormControl>
              <FormMessage />
              <FormDescription className="text-sm text-gray-500">
                Attach any relevant files for this task.
              </FormDescription>{" "}
            </FormItem>
          )}
        />
        <Button
          variant="secondary"
          type="submit"
          className="self-start"
          size="lg"
          disabled={form.formState.isSubmitting}
        >
          {form.formState.isSubmitting ? "Loading..." : textBtn}
        </Button>
      </form>
    </Form>
  );
};

export default FormTask;
