"use client";
import { FaCheck } from "react-icons/fa";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useTheme } from "next-themes";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import SelectTheme from "@/components/settings/select-theme";
import { useForm } from "react-hook-form";
import { TResetPasswordT } from "@/types/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { resetPasswordSchema } from "../../types/user";
import {
  Form,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useState } from "react";
import { userService } from "@/services/user";
import { AxiosError } from "axios";

const SettingsView = () => {
  const { setTheme, theme } = useTheme();
  const [error, setError] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const form = useForm<TResetPasswordT>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      oldPassword: "",
      newPassword: "",
    },
  });

  const onSubmit = async (data: TResetPasswordT) => {
    try {
      setError("");
      // Reset password logic goes here
      await userService.update(data);

      form.reset();

      setIsSuccess(true);
    } catch (error) {
      const axiosError = error as AxiosError;
      console.log(axiosError);
      const data = axiosError.response?.data as {
        statusCode: number;
        message: string;
      };
      setError(data.message);
      form.resetField("oldPassword", {
        defaultValue: "",
      });
    }
  };

  return (
    <div className="w-full mt-4 pt-4 pb-10 container max-w-4xl flex flex-col gap-4">
      <div className="px-3 py-4 border border-gray-500 dark:border-gray-300 rounded-md">
        <h1 className="text-2xl">Profil</h1>
        <div className="mt-3">
          <h3>Gambar Profil</h3>

          <div className="mt-2 py-2 rounded-lg px-4 flex items-center justify-center gap-2 bg-sky-500 bg-opacity-30 w-fit">
            <Label
              className="flex items-center gap-3 text-md cursor-pointer"
              htmlFor="profil-picture"
            >
              <Avatar className="w-[50px] h-[50px]">
                <AvatarImage
                  src="/avatar.jpg"
                  alt="Avatar"
                  width={100}
                  height={100}
                  className="object-cover object-center"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              Ubah
            </Label>
            <Input
              type="file"
              accept="image/*"
              className="hidden"
              id="profil-picture"
            />
          </div>
        </div>
        <Form {...form}>
          <form
            className="mt-4 flex gap-3 flex-col"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <h3>Change password</h3>

            {error ? <p className="text-red-600">{error}</p> : null}
            {isSuccess ? (
              <Alert variant="success">
                <FaCheck className="h-4 w-4" />
                <AlertTitle>Success</AlertTitle>
                <AlertDescription>
                  Change password successfully
                </AlertDescription>
              </Alert>
            ) : null}
            <FormField
              control={form.control}
              name="oldPassword"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-3 w-[40%]">
                  <Label htmlFor={field.name}>Old Password</Label>
                  <Input
                    type="password"
                    placeholder="Input your old password..."
                    className="py-5"
                    id={field.name}
                    {...field}
                  />
                  <FormMessage />
                  <FormDescription>Masukkan kata sandi lama mu</FormDescription>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="newPassword"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-3 w-[40%]">
                  <Label htmlFor={field.name}>New Password</Label>
                  <Input
                    type="password"
                    placeholder="Input your new password..."
                    className="py-5"
                    id={field.name}
                    {...field}
                  />
                  <FormMessage />
                  <FormDescription>Masukkan kata sandi baru mu</FormDescription>
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
              {form.formState.isSubmitting ? "Resetting..." : "Reset"}
            </Button>
          </form>
        </Form>
      </div>
      <div className="px-3 py-4 border border-gray-500 dark:border-gray-300 rounded-md">
        <h1 className="text-2xl">General Setting</h1>

        <div className="mt-2 flex flex-col gap-3">
          <h3>Theme</h3>
          <SelectTheme
            value={theme || "system"}
            onChnage={(value) => setTheme(value)}
          />
        </div>
      </div>
    </div>
  );
};

export default SettingsView;
