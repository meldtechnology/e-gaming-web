import React from "react";

const sizes = {
  textxs: "text-[12px] font-normal",
  texts: "text-[14px] font-normal",
  textmd: "text-[16px] font-normal",
  textlg: "text-[20px] font-normal",
  textxl: "text-[24px] font-normal lg:text-[24px] md:text-[22px]",
};

const Text = ({ children, className = "", as, size = "sm", ...restProps }) => {
  const Component = as || "p";

  return (
    <Component className={`font-helvetica ${className} ${sizes[size]}`} {...restProps}>
      {children}
    </Component>
  );
};

export { Text };
