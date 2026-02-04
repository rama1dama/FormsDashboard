import type { Metadata } from "next";
import Link from "next/link";
import { logoutAction } from "@/app/actions/auth";

export const metadata: Metadata = {
  title: "Dashboard | Forms Dashboard",
  description: "Dashboard home",
};

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-4xl px-4 py-4 flex items-center justify-between">
          <span className="text-lg font-semibold text-slate-800">Forms Dashboard</span>
          <nav className="flex items-center gap-4">
            <Link
              href="/forms"
              className="text-slate-600 hover:text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 rounded"
            >
              Forms
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

      <main className="mx-auto max-w-4xl px-4 py-12">
        <h1 className="text-2xl font-bold text-slate-800 mb-4">Dashboard</h1>
        <p className="text-slate-600 mb-6">
          Welcome. Go to the forms list to view and manage forms.
        </p>
        <Link
          href="/forms"
          className="inline-flex rounded-lg bg-sky-600 px-4 py-2 text-white font-medium hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"
        >
          View forms
        </Link>
      </main>
    </div>
  );
}
