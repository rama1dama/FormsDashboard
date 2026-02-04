import type { Metadata } from "next";
import { LoginForm } from "./LoginForm";

export const metadata: Metadata = {
  title: "Login | Forms Dashboard",
  description: "Sign in to Forms Dashboard",
};

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ from?: string }>;
}) {
  const { from } = await searchParams;
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <div className="w-full max-w-md">
        <h1 className="text-2xl font-bold text-slate-800 text-center mb-6">
          Forms Dashboard
        </h1>
        <LoginForm from={from ?? undefined} />
      </div>
    </div>
  );
}
