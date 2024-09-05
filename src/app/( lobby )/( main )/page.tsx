import { seo } from "@/utils/helper";
import HomeView from "@/views/home";
import type { Metadata } from "next";

export const metadata: Metadata = seo(
  "Home / MCLASS",
  "Deskripsi singkat tentang MCLASS, platform pembelajaran yang inovatif dan mudah digunakan.",
  "/",
  ["lms", "learning management system", "google classroom clone", "next js"]
);
export default async function Home() {
  return <HomeView />;
}
