import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { getFormsList } from "@/lib/forms-api";
import type { FormStatus } from "@/lib/types";
import { logoutAction } from "@/app/actions/auth";
import { FormsListSkeleton } from "./FormsListSkeleton";
import { FormsPageClient } from "@/app/forms/FormsPageClient";
import { cookies } from "next/headers";
import { getAuthFromCookieValue } from "@/lib/auth";

export const metadata: Metadata = {
  title: "Forms | Forms Dashboard",
  description: "Manage your forms",
};

interface PageProps {
  searchParams: Promise<{ status?: string; sort?: string; order?: string }>;
}

export default async function FormsPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const status = params.status as FormStatus | undefined;
  const sort = (params.sort as keyof import("@/lib/types").Form) ?? "updatedAt";
  const order = params.order === "asc" ? "asc" : "desc";

  const cookieStore = await cookies();
  const authCookie = cookieStore.get("auth");
  const initialAuth = getAuthFromCookieValue(authCookie?.value);

  let forms: import("@/lib/types").Form[] = [];
  let error: string | null = null;

  try {
    forms = await getFormsList({
      status: status && ["draft", "active", "archived"].includes(status) ? status : undefined,
      sort: sort || "updatedAt",
      order,
    });
  } catch {
    error = "Failed to load forms.";
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-4xl px-4 py-4 flex items-center justify-between">
          <Link href="/forms" className="text-lg font-semibold text-slate-800">
            Forms Dashboard
          </Link>
          <nav className="flex items-center gap-4">
            <Link
              href="/dashboard"
              className="text-slate-600 hover:text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 rounded"
            >
              Dashboard
            </Link>
            <Link
              href="/login"
              className="text-slate-600 hover:text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 rounded"
            >
              Login
            </Link>
            <form action={logoutAction} className="inline">
              <button
                type="submit"
                className="text-slate-600 hover:text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 rounded"
              >
                Logout
              </button>
            </form>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-4 py-8">
        <h1 className="text-2xl font-bold text-slate-800 mb-6">Forms</h1>

        {error ? (
          <div
            className="rounded-lg border border-red-200 bg-red-50 p-4 text-red-700"
            role="alert"
          >
            {error}
          </div>
        ) : (
          <Suspense fallback={<FormsListSkeleton />}>
            <FormsPageClient
              initialForms={forms}
              initialStatus={params.status ?? ""}
              initialAuth={initialAuth ? { email: initialAuth.email, role: initialAuth.role } : null}
            />
          </Suspense>
        )}
      </main>
    </div>
  );
}
