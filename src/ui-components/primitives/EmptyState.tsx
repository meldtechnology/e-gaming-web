import { type ReactNode } from "react";

export type EmptyStateProps = {
  title?: ReactNode;
  description?: ReactNode;
  action?: ReactNode;
  className?: string;
};

export const EmptyState = ({ title = "No data is available", description, action, className = "" }: EmptyStateProps) => (
  <div className={`w-full p-8 text-center text-gray-600 ${className}`.trim()}>
    <p className="font-sans text-sm font-bold">{title}</p>
    {description ? <p className="mt-2 font-sans text-sm">{description}</p> : null}
    {action ? <div className="mt-4">{action}</div> : null}
  </div>
);
