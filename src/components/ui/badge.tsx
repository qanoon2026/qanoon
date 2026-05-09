import type { HTMLAttributes } from "react";
import clsx from "clsx";

type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
  tone?: "navy" | "gold" | "red" | "blue" | "slate" | "green";
};

export function Badge({ className, tone = "slate", ...props }: BadgeProps) {
  return (
    <span
      className={clsx(
        "inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-black ring-1",
        tone === "navy" && "bg-navy-950 text-white ring-navy-900",
        tone === "gold" && "bg-gold-100 text-navy-950 ring-gold-400/30",
        tone === "red" && "bg-red-50 text-red-700 ring-red-100",
        tone === "blue" && "bg-blue-50 text-blue-700 ring-blue-100",
        tone === "green" && "bg-emerald-50 text-emerald-700 ring-emerald-100",
        tone === "slate" && "bg-slate-100 text-slate-700 ring-slate-200",
        className
      )}
      {...props}
    />
  );
}
