import { forwardRef, type HTMLAttributes } from "react";

export type CardProps = HTMLAttributes<HTMLDivElement> & {
  elevated?: boolean;
};

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className = "", elevated = true, ...props }, ref) => (
    <div
      ref={ref}
      className={`relative flex flex-col w-full h-full text-gray-700 bg-white shadow-md rounded-xl bg-clip-border ${elevated ? "" : "shadow-none"} ${className}`.trim()}
      {...props}
    />
  ),
);

Card.displayName = "Card";
