import clsx from "clsx";
import type { ReactNode } from "react";

type CardProps = {
  title?: string;
  action?: ReactNode;
  children: ReactNode;
  className?: string;
};

export default function Card({ title, action, children, className }: CardProps) {
  return (
    <section className={clsx("rounded-lg border border-slate-200 bg-white p-5 shadow-soft", className)}>
      {(title || action) && (
        <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
          {title && <h2 className="section-title">{title}</h2>}
          {action}
        </div>
      )}
      {children}
    </section>
  );
}
