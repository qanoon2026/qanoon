import type { InputHTMLAttributes } from "react";
import clsx from "clsx";

export function Input({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={clsx(
        "h-11 w-full rounded-xl border border-slate-200 bg-white/80 px-4 text-sm font-semibold text-slate-800 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-gold-400/70 focus:ring-4 focus:ring-gold-400/10",
        className
      )}
      {...props}
    />
  );
}
