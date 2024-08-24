import ButtonCraeteClass from "@/components/button/button-create-class";
import LinkActive from "@/components/side/link-active";
import React from "react";
import {
  IoSettingsOutline,
  IoSettings,
} from "react-icons/io5";
import { MdOutlineDashboard, MdDashboard } from "react-icons/md";
import { SiGoogleclassroom } from "react-icons/si";

const SidebarTeacher = () => {
  return (
    <aside className="col-span-1 py-4 flex flex-col gap-8">
      <LinkActive
        className="text-lg flex items-center gap-3 font-semibold px-3"
        href="/dashboard"
        text="Dsshboard"
        active={<MdDashboard className="text-2xl" />}
        nonActive={<MdOutlineDashboard className="text-2xl" />}
      />
      <LinkActive
        className="text-lg flex items-center gap-3 font-semibold px-3"
        href="/my-class"
        text="My Class"
        active={<SiGoogleclassroom className="text-2xl" />}
        nonActive={<SiGoogleclassroom className="text-2xl" />}
      />
      <LinkActive
        href="/settings"
        className="text-lg flex items-center gap-3 font-semibold px-3"
        text="Settings"
        active={<IoSettings className="text-2xl" />}
        nonActive={<IoSettingsOutline className="text-2xl" />}
      />
      <ButtonCraeteClass />
    </aside>
  );
};

export default SidebarTeacher;
