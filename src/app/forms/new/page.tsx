import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { getAuthFromCookieValue } from "@/lib/auth";
import { FormForm } from "@/components/FormForm";

export const metadata: Metadata = {
  title: "New Form | Forms Dashboard",
  description: "Create a new form",
};

export default async function NewFormPage() {
  const cookieStore = await cookies();
  const authCookie = cookieStore.get("auth");
  const auth = getAuthFromCookieValue(authCookie?.value);

  if (!auth || auth.role !== "Admin") {
    redirect("/forms");
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-4xl px-4 py-4 flex items-center justify-between">
          <Link href="/forms" className="text-lg font-semibold text-slate-800">
            Forms Dashboard
          </Link>
          <Link
            href="/forms"
            className="text-slate-600 hover:text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 rounded"
          >
            ← Back to list
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-4 py-8">
        <h1 className="text-2xl font-bold text-slate-800 mb-6">New form</h1>
        <FormForm />
      </main>
    </div>
  );
}
