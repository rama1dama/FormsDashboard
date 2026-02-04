import type { Metadata } from "next";
import Link from "next/link";
import { redirect, notFound } from "next/navigation";
import { cookies } from "next/headers";
import { getAuthFromCookieValue } from "@/lib/auth";
import { formsStore } from "@/lib/store";
import { FormForm } from "@/components/FormForm";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const form = await formsStore.getById(id);
  return {
    title: form ? `${form.title} | Forms Dashboard` : "Form | Forms Dashboard",
    description: form?.description ?? "Edit form",
  };
}

export default async function EditFormPage({ params }: PageProps) {
  const { id } = await params;

  const cookieStore = await cookies();
  const authCookie = cookieStore.get("auth");
  const auth = getAuthFromCookieValue(authCookie?.value);

  if (!auth || auth.role !== "Admin") {
    redirect("/forms");
  }

  const form = await formsStore.getById(id);
  if (!form) notFound();

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
        <h1 className="text-2xl font-bold text-slate-800 mb-6">Edit form</h1>
        <FormForm
          formId={id}
          defaultValues={{
            title: form.title,
            description: form.description ?? "",
            fieldsCount: form.fieldsCount,
            status: form.status,
          }}
        />
      </main>
    </div>
  );
}
