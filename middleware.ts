import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const AUTH_COOKIE = "auth";

function hasAuthCookie(request: NextRequest): boolean {
  const cookie = request.cookies.get(AUTH_COOKIE);
  if (!cookie?.value) return false;
  try {
    let decoded = decodeURIComponent(cookie.value);
    let parsed: { email?: string; role?: string } | null = null;
    try {
      parsed = JSON.parse(decoded);
    } catch {
      decoded = decodeURIComponent(decoded);
      parsed = JSON.parse(decoded);
    }
    return !!parsed?.email && (parsed.role === "Individual" || parsed.role === "Admin");
  } catch (err) {
    if (process.env.NODE_ENV === "development") {
      console.warn("[middleware] Invalid auth cookie:", err instanceof Error ? err.message : String(err));
    }
    return false;
  }
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const protectedPaths = ["/dashboard", "/forms"];
  const isProtected = protectedPaths.some(
    (p) => pathname === p || pathname.startsWith(p + "/")
  );

  if (isProtected && !hasAuthCookie(request)) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("from", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard", "/dashboard/:path*", "/forms", "/forms/:path*"],
};
