import type { SelectHTMLAttributes } from "react";
import clsx from "clsx";

export function Select({ className, children, ...props }: SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      className={clsx(
        "h-11 w-full rounded-xl border border-slate-200 bg-white/80 px-4 text-sm font-black text-navy-950 shadow-sm outline-none transition focus:border-gold-400/70 focus:ring-4 focus:ring-gold-400/10",
        className
      )}
      {...props}
    >
      {children}
    </select>
  );
}
