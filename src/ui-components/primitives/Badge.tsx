import { type HTMLAttributes } from "react";

export type BadgeProps = HTMLAttributes<HTMLDivElement> & {
  tone?: "success" | "danger" | "warning" | "neutral";
};

const tones = {
  success: "text-green-900 bg-green-500/20",
  danger: "text-red-700 bg-red-300",
  warning: "text-yellow-800 bg-yellow-500/20",
  neutral: "text-blue-gray-900 bg-gray-200",
} as const;

export const Badge = ({ tone = "success", className = "", ...props }: BadgeProps) => (
  <div
    className={`relative grid items-center px-2 py-1 font-sans text-xs font-bold uppercase rounded-md select-none whitespace-nowrap ${tones[tone]} ${className}`.trim()}
    {...props}
  />
);
