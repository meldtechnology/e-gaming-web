import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";

const shapes = {
  square: "rounded-[0px]",
  round: "rounded-[14px]",
} as const;

const variants = {
  fill: {
    blue_gray_100: "bg-blue_gray-100 text-black-900_01",
    blue_gray_900_4c: "bg-blue_gray-900_4c text-white-a700",
    white_A700: "bg-white-a700 text-black-900_01",
    blue_gray_900: "bg-blue_gray-900 text-white-a700",
  },
  outline: {
    white_A700_indigo_A700: "border-gray-900_01 border border-solid bg-gradient",
  },
} as const;

const sizes = {
  xl: "h-[56px] px-3 text-[24px]",
  xs: "h-[26px] pl-2 pr-[30px] text-[16px]",
  sm: "h-[40px] px-[34px] text-[16px]",
  lg: "h-[44px] px-1",
  md: "h-[42px] px-5 text-[20px]",
} as const;

type ButtonVariant = keyof typeof variants;
type ButtonColor =
  | keyof typeof variants.fill
  | keyof typeof variants.outline;

export type ButtonProps =
  ButtonHTMLAttributes<HTMLButtonElement> & {
    leftIcon?: ReactNode;
    rightIcon?: ReactNode;
    shape?: keyof typeof shapes;
    variant?: ButtonVariant;
    size?: keyof typeof sizes;
    color?: ButtonColor;
    buttonClicked?: ButtonHTMLAttributes<HTMLButtonElement>["onClick"];
    unstyled?: boolean;
  };

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
      color = "white_A700",
      buttonClicked,
      onClick,
      type = "button",
      unstyled = false,
      ...restProps
    },
    ref,
  ) => {
    const variantClasses = variants[variant]?.[color as never] ?? "";
    const computedClassName = unstyled
      ? className
      : `${className} flex flex-row items-center justify-center text-center cursor-pointer whitespace-nowrap ${shape ? shapes[shape] : ""} ${size ? sizes[size] : ""} ${variantClasses}`.trim();

    return (
      <button
        ref={ref}
        type={type}
        className={computedClassName}
        onClick={buttonClicked ?? onClick}
        {...restProps}
      >
        {leftIcon}
        {children}
        {rightIcon}
      </button>
    );
  },
);

Button.displayName = "Button";
