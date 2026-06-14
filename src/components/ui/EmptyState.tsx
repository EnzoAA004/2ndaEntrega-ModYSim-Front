import type { ReactNode } from "react";

export default function EmptyState({
  title = "Sin datos disponibles",
  message = "Todavía no hay información para mostrar.",
  action,
}: {
  title?: string;
  message?: string;
  action?: ReactNode;
}) {
  return (
    <div className="rounded-lg border border-dashed border-slate-300 bg-slate-50 p-6 text-center">
      <h3 className="font-semibold text-slate-900">{title}</h3>
      <p className="mt-1 text-sm text-slate-600">{message}</p>
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}
