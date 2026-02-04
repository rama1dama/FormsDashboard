import type { Role } from "./types";

const AUTH_COOKIE = "auth";

export interface AuthPayload {
  email: string;
  role: Role;
}

function parseAuthCookieValue(raw: string): AuthPayload | null {
  try {
    let decoded = decodeURIComponent(raw);
    let parsed: AuthPayload | null = null;
    try {
      parsed = JSON.parse(decoded) as AuthPayload;
    } catch {
      decoded = decodeURIComponent(decoded);
      parsed = JSON.parse(decoded) as AuthPayload;
    }
    if (parsed?.email && (parsed.role === "Individual" || parsed.role === "Admin")) {
      return parsed;
    }
  } catch (err) {
    if (process.env.NODE_ENV === "development") {
      console.warn("[auth] Invalid or malformed auth cookie:", err instanceof Error ? err.message : String(err));
    }
  }
  return null;
}

export function getAuthFromCookie(cookieHeader: string | null): AuthPayload | null {
  if (!cookieHeader) return null;
  const match = cookieHeader.match(new RegExp(`${AUTH_COOKIE}=([^;]+)`));
  if (!match) return null;
  return parseAuthCookieValue(match[1].trim());
}

export function isAdmin(cookieHeader: string | null): boolean {
  const auth = getAuthFromCookie(cookieHeader);
  return auth?.role === "Admin";
}

export function getAuthFromCookieValue(value: string | undefined): AuthPayload | null {
  if (!value) return null;
  return parseAuthCookieValue(value.trim());
}
