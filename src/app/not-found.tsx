import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 px-4">
      <h1 className="text-2xl font-bold text-slate-800 mb-2">404</h1>
      <p className="text-slate-600 mb-6">This page could not be found.</p>
      <Link
        href="/"
        className="rounded-lg bg-sky-600 px-4 py-2 text-white font-medium hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"
      >
        Go home
      </Link>
    </div>
  );
}
