import LinkActive from "@/components/side/link-active";
import ListClass from "@/components/side/list-calss";
import { Separator } from "@/components/ui/separator";
import React from "react";
import {
  IoHomeOutline,
  IoHome,
  IoSettingsOutline,
  IoSettings,
} from "react-icons/io5";

const Sidebar = () => {
  return (
    <aside className="col-span-1 py-4 flex flex-col gap-3 sticky top-0">
      <LinkActive
        className="text-lg flex items-center gap-3 font-semibold px-3"
        href="/"
        text="Home"
        active={<IoHome className="text-2xl" />}
        nonActive={<IoHomeOutline className="text-2xl" />}
      />
      <Separator />
      <ListClass />
      <Separator />
      <LinkActive
        href="/settings"
        className="text-lg flex items-center gap-3 font-semibold px-3"
        text="Settings"
        active={<IoSettings className="text-2xl" />}
        nonActive={<IoSettingsOutline className="text-2xl" />}
      />
    </aside>
  );
};

export default Sidebar;
