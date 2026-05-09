import type { ButtonHTMLAttributes } from "react";
import clsx from "clsx";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "default" | "outline" | "ghost" | "gold";
  size?: "sm" | "md" | "icon";
};

export function Button({
  className,
  variant = "default",
  size = "md",
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={clsx(
        "inline-flex items-center justify-center gap-2 rounded-xl font-black transition focus:outline-none focus:ring-2 focus:ring-gold-400/60 disabled:pointer-events-none disabled:opacity-50",
        variant === "default" && "bg-navy-950 text-white shadow-[0_14px_38px_rgba(7,17,31,0.16)] hover:bg-navy-900",
        variant === "gold" && "bg-gold-500 text-navy-950 shadow-[0_14px_38px_rgba(201,162,39,0.24)] hover:bg-gold-400",
        variant === "outline" && "border border-slate-200 bg-white/80 text-navy-950 hover:border-gold-400/50 hover:bg-gold-100/50",
        variant === "ghost" && "text-slate-600 hover:bg-slate-100 hover:text-navy-950",
        size === "sm" && "px-3 py-2 text-xs",
        size === "md" && "px-4 py-2.5 text-sm",
        size === "icon" && "size-10 p-0",
        className
      )}
      {...props}
    />
  );
}
