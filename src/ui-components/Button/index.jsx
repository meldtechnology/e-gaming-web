import React from "react";
import PropTypes from "prop-types";

const shapes = {
  square: "rounded-[0px]",
  round: "rounded-[14px]",
};
const variants = {
  fill: {
    blue_gray_100: "bg-surface-raised text-text-primary",
    blue_gray_900_4c: "bg-brand text-on-brand",
    white_A700: "bg-surface text-text-primary",
    blue_gray_900: "bg-brand text-on-brand",
  },
  outline: {
    white_A700_indigo_A700: "border-border border border-solid bg-gradient",
  },
};
const sizes = {
  xl: "h-[56px] px-3 text-[24px]",
  xs: "h-[26px] pl-2 pr-[30px] text-[16px]",
  sm: "h-[40px] px-[34px] text-[16px]",
  lg: "h-[44px] px-1",
  md: "h-[42px] px-5 text-[20px]",
};

const Button = ({
  children,
  className = "",
  leftIcon,
  rightIcon,
  shape,
  variant = "fill",
  size = "md",
  color = "white_A700",
  buttonClicked,
  ...restProps
}) => {
  return (
    <button
      className={`${className} flex flex-row items-center justify-center text-center cursor-pointer whitespace-nowrap ${shape && shapes[shape]} ${size && sizes[size]} ${variant && variants[variant]?.[color]}`}
      {...restProps}
      onClick={buttonClicked}
    >
      {!!leftIcon && leftIcon}
      {children}
      {!!rightIcon && rightIcon}
    </button>
  );
};

Button.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  leftIcon: PropTypes.node,
  rightIcon: PropTypes.node,
  shape: PropTypes.oneOf(["square", "round"]),
  size: PropTypes.oneOf(["xl", "xs", "sm", "lg", "md"]),
  variant: PropTypes.oneOf(["fill", "outline"]),
  color: PropTypes.oneOf([
    "blue_gray_100",
    "blue_gray_900_4c",
    "white_A700",
    "blue_gray_900",
    "white_A700_indigo_A700",
  ]),
};

export { Button };
