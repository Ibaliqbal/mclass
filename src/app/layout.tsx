import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "@/styles/globals.css";
import TopLoader from "@/components/loader/top-loader";
import { ThemeProvider } from "next-themes";
import { Toaster } from "react-hot-toast";
import Provider from "../provider/index";
const roboto = Roboto({ weight: "400", subsets: ["latin"] });
import { ViewTransitions } from "next-view-transitions";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ViewTransitions>
      <html lang="en">
        <body className={roboto.className}>
          <ThemeProvider defaultTheme="system" attribute="class" enableSystem>
            <TopLoader />
            <Provider>{children}</Provider>
            <Toaster
              position="bottom-right"
              reverseOrder
              toastOptions={{
                duration: 4000,
              }}
            />
          </ThemeProvider>
        </body>
      </html>
    </ViewTransitions>
  );
}
