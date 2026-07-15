import { forwardRef, type InputHTMLAttributes, type ReactNode } from "react";

export type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  wrapperClassName?: string;
};

const baseInput =
  "w-full py-2.5 bg-surface text-text-primary text-sm rounded-xl border transition-colors duration-150 placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-brand/40 disabled:cursor-not-allowed disabled:bg-surface-muted disabled:text-text-muted";

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      helperText,
      leftIcon,
      rightIcon,
      className = "",
      wrapperClassName = "",
      id,
      ...props
    },
    ref,
  ) => {
    const inputId = id ?? props.name;
    const helperId = inputId ? `${inputId}-helper` : undefined;
    const borderClass = error
      ? "border-danger focus:border-danger focus:ring-danger/30"
      : "border-border focus:border-brand hover:border-border-strong";
    const paddingClass = `${leftIcon ? "pl-10" : "pl-3.5"} ${rightIcon ? "pr-10" : "pr-3.5"}`;

    return (
      <div className={wrapperClassName}>
        {label ? (
          <label className="block mb-1.5 text-sm font-medium text-text-secondary" htmlFor={inputId}>
            {label}
          </label>
        ) : null}
        <div className="relative">
          {leftIcon ? (
            <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-text-muted">
              {leftIcon}
            </span>
          ) : null}
          <input
            ref={ref}
            id={inputId}
            className={`${baseInput} ${borderClass} ${paddingClass} ${className}`.trim()}
            aria-invalid={Boolean(error)}
            aria-describedby={helperId}
            {...props}
          />
          {rightIcon ? (
            <span className="absolute inset-y-0 right-0 flex items-center pr-3 text-text-muted">
              {rightIcon}
            </span>
          ) : null}
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

Input.displayName = "Input";
