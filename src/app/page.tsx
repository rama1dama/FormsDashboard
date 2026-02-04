import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "Forms Dashboard — Manage Forms with Ease",
  description:
    "Create, edit, and manage forms with role-based access. Simple dashboard for individuals and admins.",
  openGraph: {
    title: "Forms Dashboard — Manage Forms with Ease",
    description:
      "Create, edit, and manage forms with role-based access. Simple dashboard for individuals and admins.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Forms Dashboard — Manage Forms with Ease",
    description:
      "Create, edit, and manage forms with role-based access. Simple dashboard for individuals and admins.",
  },
};

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-4xl px-4 py-4 flex items-center justify-between">
          <span className="text-lg font-semibold text-slate-800">
            Forms Dashboard
          </span>
          <Link
            href="/login"
            className="rounded-lg bg-sky-600 px-4 py-2 text-white text-sm font-medium hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"
          >
            Sign in
          </Link>
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center px-4 py-16 text-center">
        <div className="relative w-full max-w-md aspect-square mb-8">
          <Image
            src="/next.svg"
            alt="Forms Dashboard"
            fill
            className="object-contain dark:invert"
            priority
            sizes="(max-width: 768px) 100vw, 448px"
          />
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-800 mb-4">
          Manage your forms
        </h1>
        <p className="text-slate-600 max-w-md mb-8">
          Create, edit, and organize forms with a simple dashboard. Sign in as
          Individual to view or as Admin to manage everything.
        </p>
        <Link
          href="/login"
          className="rounded-lg bg-sky-600 px-6 py-3 text-white font-medium hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"
        >
          Get started
        </Link>
      </main>

      <footer className="border-t border-slate-200 bg-white py-6">
        <div className="mx-auto max-w-4xl px-4 text-center text-sm text-slate-500">
          Forms Dashboard — no database required.
        </div>
      </footer>
    </div>
  );
}
