import { auth } from "@/lib/auth";
import { seo } from "@/utils/helper";
import SettingsView from "@/views/settings/settings-view";
import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = seo(
  "Settings / MCLASS",
  "Kelola pengaturan akun dan preferensi Anda di MCLASS, platform pembelajaran yang inovatif.",
  "/settings"
);

const page = async () => {
  const session = auth();

  if (!session) return redirect("/");

  return <SettingsView />;
};

export default page;
