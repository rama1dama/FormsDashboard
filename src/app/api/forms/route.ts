import { NextRequest, NextResponse } from "next/server";
import { formSchema } from "@/lib/schemas";
import { formsStore } from "@/lib/store";
import { getAuthFromCookie, isAdmin } from "@/lib/auth";
import type { Form } from "@/lib/types";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");
    const sort = searchParams.get("sort") ?? "updatedAt";
    const order = searchParams.get("order") ?? "desc";

    let list = await formsStore.getAll();

    if (status && ["draft", "active", "archived"].includes(status)) {
      list = list.filter((f) => f.status === status);
    }

    const sortKey: keyof Form = ["title", "status", "updatedAt", "createdAt"].includes(sort)
      ? (sort as keyof Form)
      : "updatedAt";
    list = [...list].sort((a, b) => {
      const aVal = a[sortKey];
      const bVal = b[sortKey];
      if (typeof aVal === "string" && typeof bVal === "string") {
        return order === "desc"
          ? bVal.localeCompare(aVal)
          : aVal.localeCompare(bVal);
      }
      return 0;
    });

    return NextResponse.json(list);
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch forms" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  const cookieHeader = request.headers.get("cookie");
  const auth = getAuthFromCookie(cookieHeader);
  if (!auth) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  if (!isAdmin(cookieHeader)) {
    return NextResponse.json({ error: "Admin only" }, { status: 403 });
  }

  try {
    const body = await request.json();
    const parsed = formSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validation failed", issues: parsed.error.flatten() },
        { status: 400 }
      );
    }
    const form = await formsStore.create(parsed.data);
    return NextResponse.json(form, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Failed to create form" },
      { status: 500 }
    );
  }
}
