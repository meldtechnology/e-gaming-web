import { type HTMLAttributes } from "react";

export type BadgeTone = "success" | "danger" | "warning" | "neutral" | "info" | "brand";

export type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
  tone?: BadgeTone;
  /** soft = tinted background (default); solid = filled background */
  variant?: "soft" | "solid";
  dot?: boolean;
};

const soft: Record<BadgeTone, string> = {
  success: "text-success bg-success-soft",
  danger: "text-danger bg-danger-soft",
  warning: "text-warning bg-warning-soft",
  info: "text-info bg-info-soft",
  brand: "text-brand bg-brand-soft",
  neutral: "text-text-secondary bg-surface-raised",
};

const solid: Record<BadgeTone, string> = {
  success: "text-white bg-success",
  danger: "text-white bg-danger",
  warning: "text-white bg-warning",
  info: "text-white bg-info",
  brand: "text-on-brand bg-brand",
  neutral: "text-text-inverse bg-text-secondary",
};

const dotColor: Record<BadgeTone, string> = {
  success: "bg-success",
  danger: "bg-danger",
  warning: "bg-warning",
  info: "bg-info",
  brand: "bg-brand",
  neutral: "bg-text-muted",
};

export const Badge = ({
  tone = "neutral",
  variant = "soft",
  dot = false,
  className = "",
  children,
  ...props
}: BadgeProps) => (
  <span
    className={`inline-flex items-center gap-1.5 px-2.5 py-1 font-semibold text-xs rounded-full select-none whitespace-nowrap ${
      variant === "solid" ? solid[tone] : soft[tone]
    } ${className}`.trim()}
    {...props}
  >
    {dot ? (
      <span className={`h-1.5 w-1.5 rounded-full ${variant === "solid" ? "bg-current" : dotColor[tone]}`} />
    ) : null}
    {children}
  </span>
);
