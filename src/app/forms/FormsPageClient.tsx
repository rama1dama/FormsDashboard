"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect } from "react";
import { FormsList } from "./FormsList";
import type { Form } from "@/lib/types";
import type { Role } from "@/lib/types";
import { useAuthStore } from "@/stores/authStore";

export function FormsPageClient({
  initialForms,
  initialStatus,
  initialAuth,
}: {
  initialForms: Form[];
  initialStatus: string;
  initialAuth: { email: string; role: Role } | null;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const setAuth = useAuthStore((s) => s.setAuth);

  useEffect(() => {
    if (initialAuth) setAuth(initialAuth.email, initialAuth.role);
  }, [initialAuth, setAuth]);

  const onStatusFilterChange = useCallback(
    (status: string) => {
      const next = new URLSearchParams(searchParams.toString());
      if (status) next.set("status", status);
      else next.delete("status");
      router.push(`/forms?${next.toString()}`);
    },
    [router, searchParams]
  );

  return (
    <FormsList
      forms={initialForms}
      statusFilter={initialStatus}
      onStatusFilterChange={onStatusFilterChange}
      initialRole={initialAuth?.role ?? null}
    />
  );
}
