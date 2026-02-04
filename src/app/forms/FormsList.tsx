"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/authStore";
import type { Form } from "@/lib/types";
import type { Role } from "@/lib/types";

interface FormsListProps {
  forms: Form[];
  statusFilter: string;
  onStatusFilterChange: (status: string) => void;
  initialRole?: Role | null;
}

export function FormsList({ forms, statusFilter, onStatusFilterChange, initialRole = null }: FormsListProps) {
  const router = useRouter();
  const storeRole = useAuthStore((s) => s.role);
  const isAdmin = (storeRole ?? initialRole) === "Admin";

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-4">
        <label htmlFor="filter-status" className="text-sm font-medium text-slate-700">
          Filter by status
        </label>
        <select
          id="filter-status"
          value={statusFilter}
          onChange={(e) => onStatusFilterChange(e.target.value)}
          className="rounded-lg border border-slate-300 px-3 py-2 text-slate-900 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/20"
          aria-label="Filter forms by status"
        >
          <option value="">All</option>
          <option value="draft">Draft</option>
          <option value="active">Active</option>
          <option value="archived">Archived</option>
        </select>
        {isAdmin && (
          <button
            type="button"
            onClick={() => router.push("/forms/new")}
            className="rounded-lg bg-sky-600 px-4 py-2 text-white font-medium hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"
          >
            New form
          </button>
        )}
      </div>

      <div className="overflow-x-auto rounded-lg border border-slate-200 bg-white">
        <table className="min-w-full divide-y divide-slate-200" role="grid">
          <thead>
            <tr>
              <th scope="col" className="px-4 py-3 text-left text-sm font-semibold text-slate-700">
                Title
              </th>
              <th scope="col" className="px-4 py-3 text-left text-sm font-semibold text-slate-700">
                Status
              </th>
              <th scope="col" className="px-4 py-3 text-left text-sm font-semibold text-slate-700">
                Updated
              </th>
              {isAdmin && (
                <th scope="col" className="px-4 py-3 text-right text-sm font-semibold text-slate-700">
                  Actions
                </th>
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {forms.map((form) => (
              <tr key={form.id} className="hover:bg-slate-50">
                <td className="px-4 py-3">
                  {isAdmin ? (
                    <Link
                      href={`/forms/${form.id}`}
                      className="text-sky-600 hover:underline font-medium focus:outline-none focus:ring-2 focus:ring-sky-500 rounded"
                    >
                      {form.title}
                    </Link>
                  ) : (
                    <span className="text-slate-900">{form.title}</span>
                  )}
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      form.status === "active"
                        ? "bg-emerald-100 text-emerald-800"
                        : form.status === "draft"
                          ? "bg-amber-100 text-amber-800"
                          : "bg-slate-100 text-slate-700"
                    }`}
                  >
                    {form.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-sm text-slate-600">
                  {new Date(form.updatedAt).toLocaleDateString()}
                </td>
                {isAdmin && (
                  <td className="px-4 py-3 text-right">
                    <Link
                      href={`/forms/${form.id}`}
                      className="text-sky-600 hover:underline text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 rounded"
                    >
                      Edit
                    </Link>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {forms.length === 0 && (
        <p className="text-center py-8 text-slate-500">No forms found.</p>
      )}
    </div>
  );
}
