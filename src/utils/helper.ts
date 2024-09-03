import type { Metadata } from "next";
export function generateRandomCode(leng: number, existCode: string[]) {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let code = [];

  while (code.length < leng) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    code.push(characters.charAt(randomIndex));

    // Cek jika hasilnya sama dengan someCode
    if (existCode.includes(code.join(""))) {
      code = []; // Reset jika sama
    }
  }

  return code.join(""); // Kembalikan hasil sebagai string
}

export const seo = (
  title: string,
  description: string,
  site: string,
  keywords?: string[]
): Metadata => {
  return {
    title,
    description,
    keywords,
    openGraph: {
      type: "website",
      title,
      description,
      siteName: `${process.env.NEXT_PUBLIC_APP_URL}/${site}`,
      url: `${process.env.NEXT_PUBLIC_APP_URL}/${site}`,
    },
    applicationName: "MCLASS",
    robots: {},
  };
};
