import clsx from "clsx";
import type { ReactNode } from "react";

type BadgeProps = {
  children: ReactNode;
  variant?: "success" | "warning" | "orange" | "danger" | "neutral" | "info";
};

const variants = {
  success: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  warning: "bg-amber-50 text-amber-800 ring-amber-200",
  orange: "bg-orange-50 text-orange-700 ring-orange-200",
  danger: "bg-red-50 text-red-700 ring-red-200",
  neutral: "bg-slate-100 text-slate-700 ring-slate-200",
  info: "bg-cyan-50 text-cyan-700 ring-cyan-200",
};

export default function Badge({ children, variant = "neutral" }: BadgeProps) {
  return (
    <span className={clsx("inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ring-1", variants[variant])}>
      {children}
    </span>
  );
}
