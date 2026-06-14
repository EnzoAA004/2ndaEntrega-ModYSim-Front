import clsx from "clsx";
import type { SelectHTMLAttributes } from "react";
import type { Option } from "../../types/common";

type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  label?: string;
  options: Option[];
  error?: string;
  helperText?: string;
};

export default function Select({ label, options, error, helperText, className, id, ...props }: SelectProps) {
  const inputId = id ?? props.name;
  return (
    <label className="grid gap-1.5 text-sm font-medium text-slate-700" htmlFor={inputId}>
      {label}
      <select
        id={inputId}
        className={clsx(
          "rounded-md border bg-white px-3 py-2 text-slate-900 outline-none transition focus:border-cyan-600 focus:ring-2 focus:ring-cyan-100",
          error ? "border-red-400" : "border-slate-300",
          className,
        )}
        {...props}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {helperText && !error && <span className="text-xs font-normal text-slate-500">{helperText}</span>}
      {error && <span className="text-xs font-normal text-red-600">{error}</span>}
    </label>
  );
}
