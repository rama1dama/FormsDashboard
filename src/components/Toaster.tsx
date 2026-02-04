"use client";

import { useEffect } from "react";
import { useToastStore } from "@/stores/toastStore";

const typeStyles: Record<string, string> = {
  success: "bg-emerald-600 text-white",
  error: "bg-red-600 text-white",
  info: "bg-sky-600 text-white",
};

export function Toaster() {
  const { toasts, removeToast } = useToastStore();

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    toasts.forEach((t) => {
      timers.push(
        setTimeout(() => removeToast(t.id), 4000)
      );
    });
    return () => timers.forEach(clearTimeout);
  }, [toasts, removeToast]);

  if (toasts.length === 0) return null;

  return (
    <div
      className="fixed bottom-4 right-4 z-50 flex flex-col gap-2"
      role="region"
      aria-label="Notifications"
    >
      {toasts.map((t) => (
        <div
          key={t.id}
          className={`min-w-[280px] max-w-md rounded-lg px-4 py-3 shadow-lg ${typeStyles[t.type] ?? typeStyles.success}`}
          role="alert"
        >
          <p className="text-sm font-medium">{t.message}</p>
        </div>
      ))}
    </div>
  );
}
