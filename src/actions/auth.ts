"use server";

import { signIn } from "@/lib/auth";

export async function login(formData: FormData) {
  const res = await signIn("credentials", formData);

  return res;
}
