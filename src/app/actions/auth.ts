"use server";

import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { flattenError } from "zod";

import { loginSchema } from "@/lib/schemas";
import type { Role } from "@/lib/types";

const AUTH_COOKIE = "auth";
const MAX_AGE = 60 * 60 * 24 * 7;

export async function loginAction(formData: FormData) {
  const raw = {
    email: formData.get("email") as string,
    role: formData.get("role") as Role,
  };
  const parsed = loginSchema.safeParse(raw);
  if (!parsed.success) {
    return { error: flattenError(parsed.error).fieldErrors };
  }

  const payload = JSON.stringify({
    email: parsed.data.email,
    role: parsed.data.role,
  });
  const cookieStore = await cookies();
  cookieStore.set(AUTH_COOKIE, encodeURIComponent(payload), {
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: MAX_AGE,
    path: "/",
  });

  const from = formData.get("from") as string | null;
  redirect(from && from.startsWith("/") ? from : "/forms");
}

export async function logoutAction() {
  const cookieStore = await cookies();
  cookieStore.delete(AUTH_COOKIE);
  redirect("/login");
}
