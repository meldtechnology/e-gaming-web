import React from "react";
import PropTypes from "prop-types";

const variants = {
  primary:
    "border-blue_gray-100 border border-solid checked:border-blue_gray-100 checked:border-[3px] checked:border-solid checked:bg-gray-100_01 checked:focus:bg-gray-100_01 checked:focus:border-blue_gray-100 checked:hover:bg-gray-100_01 checked:hover:border-blue_gray-100",
};
const sizes = {
  xs: "h-[28px] w-[28px] rounded-[10px]",
};

const CheckBox = React.forwardRef(
  (
    {
      className = "",
      name = "",
      label = "",
      id = "checkbox_id",
      onChange,
      variant = "primary",
      size = "xs",
      ...restProps
    },
    ref,
  ) => {
    const handleChange = (e) => {
      if (onChange) onChange(e?.target?.checked);
    };

    return (
      <>
        <div className={className + " flex items-center gap-[5px] cursor-pointer"}>
          <input
            className={` ${(size && sizes[size]) || ""} ${(variant && variants[variant]) || ""}`}
            ref={ref}
            type="checkbox"
            name={name}
            onChange={handleChange}
            id={id}
            {...restProps}
          />
          {!!label && <label htmlFor={id}>{label}</label>}
        </div>
      </>
    );
  },
);

CheckBox.propTypes = {
  className: PropTypes.string,
  name: PropTypes.string,
  label: PropTypes.string,
  id: PropTypes.string,
  size: PropTypes.oneOf(["xs"]),
  variant: PropTypes.oneOf(["primary"]),
};

export { CheckBox };
