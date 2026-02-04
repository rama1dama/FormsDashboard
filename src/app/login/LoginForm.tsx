"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginSchemaType } from "@/lib/schemas";
import { useAuthStore } from "@/stores/authStore";
import { loginAction } from "../actions/auth";
import { useTransition } from "react";

export function LoginForm({ from }: { from?: string }) {
  const [isPending, startTransition] = useTransition();
  const setAuth = useAuthStore((s) => s.setAuth);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<LoginSchemaType>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", role: undefined },
  });

  function onSubmit(data: LoginSchemaType) {
    startTransition(async () => {
      const formData = new FormData();
      formData.set("email", data.email);
      formData.set("role", data.role);
      if (from) formData.set("from", from);

      const result = await loginAction(formData);
      if (result?.error) {
        Object.entries(result.error).forEach(([key, messages]) => {
          const msg = Array.isArray(messages) ? messages[0] : messages;
          if (msg) setError(key as keyof LoginSchemaType, { message: msg });
        });
        return;
      }
      setAuth(data.email, data.role);
    });
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 space-y-4"
      noValidate
    >
      <div>
        <label htmlFor="login-email" className="block text-sm font-medium text-slate-700 mb-1">
          Email
        </label>
        <input
          id="login-email"
          type="email"
          autoComplete="email"
          {...register("email")}
          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/20"
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? "login-email-error" : undefined}
        />
        {errors.email && (
          <p id="login-email-error" className="mt-1 text-sm text-red-600" role="alert">
            {errors.email.message}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="login-role" className="block text-sm font-medium text-slate-700 mb-1">
          Role
        </label>
        <select
          id="login-role"
          {...register("role")}
          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/20"
          aria-invalid={!!errors.role}
          aria-describedby={errors.role ? "login-role-error" : undefined}
        >
          <option value="">Select role</option>
          <option value="Individual">Individual</option>
          <option value="Admin">Admin</option>
        </select>
        {errors.role && (
          <p id="login-role-error" className="mt-1 text-sm text-red-600" role="alert">
            {errors.role.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="w-full rounded-lg bg-sky-600 text-white font-medium py-2.5 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 disabled:opacity-50"
      >
        {isPending ? "Signing in…" : "Sign in"}
      </button>
    </form>
  );
}
