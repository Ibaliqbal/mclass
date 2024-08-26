"use client";
import { useTheme } from "next-themes";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import SelectTheme from "@/components/settings/select-theme";
const SettingsView = () => {
  const { setTheme, theme } = useTheme();

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
        <div className="mt-4 flex gap-3 flex-col">
          <h3>Change password</h3>

          <div className="flex flex-col gap-3 w-[40%]">
            <Label htmlFor="old-password">Old Password</Label>
            <Input
              type="password"
              id="old-password"
              placeholder="Input your old password..."
              className="py-5"
            />
          </div>
          <div className="flex flex-col gap-3 w-[40%]">
            <Label htmlFor="new-password">New Password</Label>
            <Input
              type="password"
              id="new-password"
              placeholder="Input your new password..."
              className="py-5"
            />
          </div>
          <Button variant="secondary" className="self-start" size="lg">
            Reset
          </Button>
        </div>
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
