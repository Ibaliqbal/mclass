import { auth } from "@/lib/auth";
import SettingsView from "@/views/settings/settings-view";
import { redirect } from "next/navigation";

const page = async () => {
  const session = auth();

  if (!session) return redirect("/");

  return <SettingsView />;
};

export default page;
