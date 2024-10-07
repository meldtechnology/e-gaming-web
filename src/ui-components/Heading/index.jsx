import React from "react";

const sizes = {
  headingxs: "text-[14px] font-bold",
  headings: "text-[16px] font-bold",
  headingmd: "text-[20px] font-bold",
  headinglg: "text-[24px] font-bold lg:text-[24px] md:text-[22px]",
  headingxl: "text-[36px] font-bold lg:text-[36px] md:text-[34px] sm:text-[32px]",
};

const Heading = ({ children, className = "", size = "headings", as, ...restProps }) => {
  const Component = as || "h6";

  return (
    <Component className={`font-helvetica ${className} ${sizes[size]}`} {...restProps}>
      {children}
    </Component>
  );
};

export { Heading };
