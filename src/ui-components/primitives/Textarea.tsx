import { forwardRef, type TextareaHTMLAttributes } from "react";

export type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label?: string;
  error?: string;
  helperText?: string;
  wrapperClassName?: string;
};

const baseTextarea =
  "w-full px-3.5 py-2.5 bg-surface text-text-primary text-sm rounded-xl border transition-colors duration-150 placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-brand/40 disabled:cursor-not-allowed disabled:bg-surface-muted disabled:text-text-muted";

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, helperText, className = "", wrapperClassName = "", id, rows = 4, ...props }, ref) => {
    const areaId = id ?? props.name;
    const helperId = areaId ? `${areaId}-helper` : undefined;
    const borderClass = error
      ? "border-danger focus:border-danger focus:ring-danger/30"
      : "border-border focus:border-brand hover:border-border-strong";

    return (
      <div className={wrapperClassName}>
        {label ? (
          <label className="block mb-1.5 text-sm font-medium text-text-secondary" htmlFor={areaId}>
            {label}
          </label>
        ) : null}
        <textarea
          ref={ref}
          id={areaId}
          rows={rows}
          className={`${baseTextarea} ${borderClass} ${className}`.trim()}
          aria-invalid={Boolean(error)}
          aria-describedby={helperId}
          {...props}
        />
        {helperText || error ? (
          <p id={helperId} className={`mt-1.5 text-xs ${error ? "text-danger" : "text-text-muted"}`}>
            {error ?? helperText}
          </p>
        ) : null}
      </div>
    );
  },
);

Textarea.displayName = "Textarea";
