import { type ReactNode } from "react";

export type PageHeaderProps = {
  title: ReactNode;
  description?: ReactNode;
  actions?: ReactNode;
  /** Optional row of tabs / filters rendered below the title block. */
  toolbar?: ReactNode;
  className?: string;
};

/**
 * Shared admin page header. Gives every `/app/*` screen a consistent title,
 * description, action slot and optional toolbar.
 */
export const PageHeader = ({ title, description, actions, toolbar, className = "" }: PageHeaderProps) => (
  <div className={`mb-6 ${className}`.trim()}>
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="min-w-0">
        <h1 className="text-2xl font-bold tracking-tight text-text-primary">{title}</h1>
        {description ? <p className="mt-1 text-sm text-text-secondary">{description}</p> : null}
      </div>
      {actions ? <div className="flex flex-shrink-0 flex-wrap items-center gap-2">{actions}</div> : null}
    </div>
    {toolbar ? <div className="mt-4">{toolbar}</div> : null}
  </div>
);
