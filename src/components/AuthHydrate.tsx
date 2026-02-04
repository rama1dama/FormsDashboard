"use client";

import { useEffect } from "react";
import { useAuthStore } from "@/stores/authStore";
import type { Role } from "@/lib/types";

const AUTH_COOKIE = "auth";

export function AuthHydrate() {
  const setAuth = useAuthStore((s) => s.setAuth);

  useEffect(() => {
    const raw = document.cookie
      .split("; ")
      .find((row) => row.startsWith(`${AUTH_COOKIE}=`));
    if (!raw) return;
    const value = raw.split("=").slice(1).join("=").trim();
    try {
      const decoded = decodeURIComponent(value);
      const parsed = JSON.parse(decoded) as { email?: string; role?: Role };
      if (parsed.email && (parsed.role === "Individual" || parsed.role === "Admin")) {
        setAuth(parsed.email, parsed.role);
      }
    } catch (err) {
      if (process.env.NODE_ENV === "development") {
        console.warn("[AuthHydrate] Could not parse auth cookie:", err instanceof Error ? err.message : String(err));
      }
    }
  }, [setAuth]);

  return null;
}
