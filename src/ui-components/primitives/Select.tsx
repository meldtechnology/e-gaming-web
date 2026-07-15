import { forwardRef, type ReactNode, type SelectHTMLAttributes } from "react";

export type SelectOption = { label: string; value: string | number };

export type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  label?: string;
  error?: string;
  helperText?: string;
  options?: SelectOption[];
  wrapperClassName?: string;
  children?: ReactNode;
};

const baseSelect =
  "w-full appearance-none py-2.5 pl-3.5 pr-10 bg-surface text-text-primary text-sm rounded-xl border transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-brand/40 disabled:cursor-not-allowed disabled:bg-surface-muted disabled:text-text-muted";

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    { label, error, helperText, options, className = "", wrapperClassName = "", id, children, ...props },
    ref,
  ) => {
    const selectId = id ?? props.name;
    const helperId = selectId ? `${selectId}-helper` : undefined;
    const borderClass = error
      ? "border-danger focus:border-danger focus:ring-danger/30"
      : "border-border focus:border-brand hover:border-border-strong";

    return (
      <div className={wrapperClassName}>
        {label ? (
          <label className="block mb-1.5 text-sm font-medium text-text-secondary" htmlFor={selectId}>
            {label}
          </label>
        ) : null}
        <div className="relative">
          <select
            ref={ref}
            id={selectId}
            className={`${baseSelect} ${borderClass} ${className}`.trim()}
            aria-invalid={Boolean(error)}
            aria-describedby={helperId}
            {...props}
          >
            {options
              ? options.map((option) => (
                  <option key={String(option.value)} value={option.value}>
                    {option.label}
                  </option>
                ))
              : children}
          </select>
          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-text-muted">
            <svg width="16" height="16" viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <path d="M6 8l4 4 4-4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </div>
        {helperText || error ? (
          <p id={helperId} className={`mt-1.5 text-xs ${error ? "text-danger" : "text-text-muted"}`}>
            {error ?? helperText}
          </p>
        ) : null}
      </div>
    );
  },
);

Select.displayName = "Select";
