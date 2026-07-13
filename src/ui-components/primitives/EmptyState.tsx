import { type ReactNode } from "react";

export type EmptyStateProps = {
  title?: ReactNode;
  description?: ReactNode;
  action?: ReactNode;
  icon?: ReactNode;
  className?: string;
};

const DefaultIcon = (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <rect x="3" y="4" width="18" height="16" rx="2.5" stroke="currentColor" strokeWidth="1.6" />
    <path d="M3 9h18M8 14h8M8 17h5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
  </svg>
);

export const EmptyState = ({ title = "No data is available", description, action, icon, className = "" }: EmptyStateProps) => (
  <div className={`flex w-full flex-col items-center justify-center px-6 py-12 text-center ${className}`.trim()}>
    <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-surface-raised text-text-muted">
      {icon ?? DefaultIcon}
    </div>
    <p className="text-base font-semibold text-text-primary">{title}</p>
    {description ? <p className="mt-1.5 max-w-sm text-sm text-text-secondary">{description}</p> : null}
    {action ? <div className="mt-5">{action}</div> : null}
  </div>
);
