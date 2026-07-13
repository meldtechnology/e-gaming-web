import { Badge, type BadgeTone } from "./Badge";

/**
 * Single source of truth for mapping domain statuses to a visual tone.
 * Covers application, payment and license statuses used across the app.
 */
const STATUS_TONE: Record<string, BadgeTone> = {
  PENDING: "warning",
  REVIEW: "brand",
  APPROVE: "success",
  APPROVED: "success",
  ISSUED: "info",
  PAID: "success",
  ACTIVE: "success",
  VALID: "success",
  COMPLETED: "success",
  DECLINE: "danger",
  DECLINED: "danger",
  FAILED: "danger",
  EXPIRED: "danger",
  CANCELED: "neutral",
  CANCELLED: "neutral",
  INACTIVE: "neutral",
  UNKNOWN: "neutral",
};

export const statusTone = (status?: string): BadgeTone =>
  (status ? STATUS_TONE[status.toUpperCase()] : undefined) ?? "neutral";

export type StatusBadgeProps = {
  status?: string;
  fallback?: string;
  variant?: "soft" | "solid";
  className?: string;
};

export const StatusBadge = ({ status, fallback = "PENDING", variant = "soft", className = "" }: StatusBadgeProps) => {
  const value = status ?? fallback;
  return (
    <Badge tone={statusTone(value)} variant={variant} dot className={className}>
      {value}
    </Badge>
  );
};
