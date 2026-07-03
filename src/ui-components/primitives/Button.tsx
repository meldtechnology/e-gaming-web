import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";

const shapes = {
  square: "rounded-none",
  round: "rounded-full",
} as const;

/**
 * v2 variants map to intent-based tokens. Legacy color keys (blue_gray_900,
 * white_A700, etc.) are preserved so existing callers keep working.
 */
const variants = {
  fill: {
    primary:
      "bg-brand text-on-brand shadow-e1 hover:bg-brand-strong active:bg-brand-strong",
    secondary:
      "bg-surface-raised text-text-primary hover:bg-surface-sunken",
    danger: "bg-danger text-text-inverse hover:brightness-95",
    success: "bg-success text-text-inverse hover:brightness-95",
    // legacy color keys ↓ (kept for backward compatibility)
    blue_gray_100: "bg-surface-raised text-text-primary hover:bg-surface-sunken",
    blue_gray_900_4c: "bg-brand text-on-brand hover:bg-brand-strong",
    white_A700: "bg-brand text-on-brand shadow-e1 hover:bg-brand-strong",
    blue_gray_900: "bg-brand text-on-brand hover:bg-brand-strong",
  },
  outline: {
    primary:
      "border border-brand text-brand bg-transparent hover:bg-brand-soft",
    neutral:
      "border border-border-strong text-text-primary bg-transparent hover:bg-surface-raised",
    white_A700_indigo_A700:
      "border border-border-strong text-text-primary bg-transparent hover:bg-surface-raised",
  },
  ghost: {
    primary: "bg-transparent text-brand hover:bg-brand-soft",
    neutral: "bg-transparent text-text-secondary hover:bg-surface-raised hover:text-text-primary",
  },
} as const;

const sizes = {
  xs: "h-8 px-3 text-xs gap-1.5",
  sm: "h-9 px-4 text-sm gap-2",
  md: "h-11 px-5 text-sm gap-2",
  lg: "h-12 px-6 text-base gap-2.5",
  xl: "h-14 px-7 text-lg gap-3",
} as const;

type ButtonVariant = keyof typeof variants;
type ButtonColor =
  | keyof typeof variants.fill
  | keyof typeof variants.outline
  | keyof typeof variants.ghost;

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  shape?: keyof typeof shapes;
  variant?: ButtonVariant;
  size?: keyof typeof sizes;
  color?: ButtonColor;
  loading?: boolean;
  fullWidth?: boolean;
  buttonClicked?: ButtonHTMLAttributes<HTMLButtonElement>["onClick"];
  unstyled?: boolean;
};

const base =
  "inline-flex flex-row items-center justify-center text-center font-semibold cursor-pointer whitespace-nowrap rounded-xl transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-surface disabled:cursor-not-allowed disabled:opacity-50";

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      className = "",
      leftIcon,
      rightIcon,
      shape,
      variant = "fill",
      size = "md",
      color = "primary",
      loading = false,
      fullWidth = false,
      buttonClicked,
      onClick,
      type = "button",
      disabled,
      unstyled = false,
      ...restProps
    },
    ref,
  ) => {
    const variantGroup = variants[variant] as Record<string, string> | undefined;
    const variantClasses = variantGroup?.[color as string] ?? variants.fill.primary;
    const computedClassName = unstyled
      ? className
      : `${base} ${shape ? shapes[shape] : ""} ${sizes[size]} ${variantClasses} ${fullWidth ? "w-full" : ""} ${className}`.trim();

    return (
      <button
        ref={ref}
        type={type}
        className={computedClassName}
        onClick={buttonClicked ?? onClick}
        disabled={disabled || loading}
        aria-busy={loading || undefined}
        {...restProps}
      >
        {loading ? (
          <svg
            className="h-4 w-4 animate-spin"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
          >
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-90" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
          </svg>
        ) : (
          leftIcon
        )}
        {children}
        {rightIcon}
      </button>
    );
  },
);

Button.displayName = "Button";
