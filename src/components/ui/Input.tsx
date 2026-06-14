import clsx from "clsx";
import type { InputHTMLAttributes } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: string;
  helperText?: string;
};

export default function Input({ label, error, helperText, className, id, ...props }: InputProps) {
  const inputId = id ?? props.name;
  return (
    <label className="grid gap-1.5 text-sm font-medium text-slate-700" htmlFor={inputId}>
      {label}
      <input
        id={inputId}
        className={clsx(
          "rounded-md border bg-white px-3 py-2 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-cyan-600 focus:ring-2 focus:ring-cyan-100",
          error ? "border-red-400" : "border-slate-300",
          className,
        )}
        {...props}
      />
      {helperText && !error && <span className="text-xs font-normal text-slate-500">{helperText}</span>}
      {error && <span className="text-xs font-normal text-red-600">{error}</span>}
    </label>
  );
}
