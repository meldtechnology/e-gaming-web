import { forwardRef, type InputHTMLAttributes, type ReactNode } from "react";

export type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  wrapperClassName?: string;
};

const inputClass =
  "w-full pl-3 pr-10 py-2 bg-transparent placeholder:text-slate-400 text-slate-600 text-sm border border-slate-200 rounded-md transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow";

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

    return (
      <div className={wrapperClassName}>
        {label ? (
          <label className="block mb-2 text-sm text-slate-600" htmlFor={inputId}>
            {label}
          </label>
        ) : null}
        <div className="relative">
          {leftIcon}
          <input
            ref={ref}
            id={inputId}
            className={`${inputClass} ${className}`.trim()}
            aria-invalid={Boolean(error)}
            aria-describedby={helperId}
            {...props}
          />
          {rightIcon}
        </div>
        {helperText || error ? (
          <p id={helperId} className={error ? "mt-1 text-1xl text-red-600 dark:text-red-500 bg-red-300" : "mt-2 text-xs text-slate-400"}>
            {error ?? helperText}
          </p>
        ) : null}
      </div>
    );
  },
);

Input.displayName = "Input";
