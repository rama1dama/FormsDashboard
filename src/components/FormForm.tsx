"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { formSchema, type FormSchemaType } from "@/lib/schemas";
import { useRouter } from "next/navigation";
import { useToastStore } from "@/stores/toastStore";

interface FormFormProps {
  formId?: string;
  defaultValues?: Partial<FormSchemaType>;
}

export function FormForm({ formId, defaultValues }: FormFormProps) {
  const router = useRouter();
  const addToast = useToastStore((s) => s.addToast);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues ?? {
      title: "",
      description: "",
      fieldsCount: 0,
      status: "draft",
    },
  });

  async function onSubmit(data: FormSchemaType) {
    const url = formId ? `/api/forms/${formId}` : "/api/forms";
    const method = formId ? "PUT" : "POST";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
      credentials: "include",
    });

    if (!res.ok) {
      const body = await res.json().catch(() => ({}));
      addToast(body?.error ?? "Request failed", "error");
      return;
    }

    addToast(formId ? "Form updated." : "Form created.");
    router.push("/forms");
  }

  async function onDelete() {
    if (!formId) return;
    if (!confirm("Delete this form?")) return;

    const res = await fetch(`/api/forms/${formId}`, {
      method: "DELETE",
      credentials: "include",
    });

    if (!res.ok) {
      addToast("Failed to delete.", "error");
      return;
    }

    addToast("Form deleted.");
    router.push("/forms");
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 max-w-xl"
      noValidate
    >
      <div>
        <label htmlFor="form-title" className="block text-sm font-medium text-slate-700 mb-1">
          Title <span className="text-red-500">*</span>
        </label>
        <input
          id="form-title"
          type="text"
          {...register("title")}
          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/20"
          aria-invalid={!!errors.title}
          aria-describedby={errors.title ? "form-title-error" : undefined}
        />
        {errors.title && (
          <p id="form-title-error" className="mt-1 text-sm text-red-600" role="alert">
            {errors.title.message}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="form-description" className="block text-sm font-medium text-slate-700 mb-1">
          Description
        </label>
        <textarea
          id="form-description"
          rows={3}
          {...register("description")}
          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/20"
          aria-invalid={!!errors.description}
        />
      </div>

      <div>
        <label htmlFor="form-fieldsCount" className="block text-sm font-medium text-slate-700 mb-1">
          Fields count (0–50)
        </label>
        <input
          id="form-fieldsCount"
          type="number"
          min={0}
          max={50}
          {...register("fieldsCount", { valueAsNumber: true })}
          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/20"
          aria-invalid={!!errors.fieldsCount}
          aria-describedby={errors.fieldsCount ? "form-fieldsCount-error" : undefined}
        />
        {errors.fieldsCount && (
          <p id="form-fieldsCount-error" className="mt-1 text-sm text-red-600" role="alert">
            {errors.fieldsCount.message}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="form-status" className="block text-sm font-medium text-slate-700 mb-1">
          Status
        </label>
        <select
          id="form-status"
          {...register("status")}
          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/20"
          aria-invalid={!!errors.status}
          aria-describedby={errors.status ? "form-status-error" : undefined}
        >
          <option value="draft">Draft</option>
          <option value="active">Active</option>
          <option value="archived">Archived</option>
        </select>
        {errors.status && (
          <p id="form-status-error" className="mt-1 text-sm text-red-600" role="alert">
            {errors.status.message}
          </p>
        )}
      </div>

      <div className="flex flex-wrap gap-3 pt-2">
        <button
          type="submit"
          disabled={isSubmitting}
          className="rounded-lg bg-sky-600 px-4 py-2 text-white font-medium hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 disabled:opacity-50"
        >
          {isSubmitting ? "Saving…" : formId ? "Update" : "Create"}
        </button>
        <button
          type="button"
          onClick={() => router.push("/forms")}
          className="rounded-lg border border-slate-300 px-4 py-2 text-slate-700 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"
        >
          Cancel
        </button>
        {formId && (
          <button
            type="button"
            onClick={onDelete}
            disabled={isSubmitting}
            className="rounded-lg border border-red-300 px-4 py-2 text-red-700 hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:opacity-50"
          >
            Delete
          </button>
        )}
      </div>
    </form>
  );
}
