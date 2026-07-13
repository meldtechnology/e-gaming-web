import { forwardRef, type HTMLAttributes } from "react";

export type CardProps = HTMLAttributes<HTMLDivElement> & {
  elevated?: boolean;
  /** Adds inner padding. Set false to control padding via className. */
  padded?: boolean;
};

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className = "", elevated = true, padded = false, ...props }, ref) => (
    <div
      ref={ref}
      className={`relative flex flex-col w-full bg-surface text-text-primary border border-border rounded-2xl bg-clip-border ${
        elevated ? "shadow-e1" : ""
      } ${padded ? "p-5" : ""} ${className}`.trim()}
      {...props}
    />
  ),
);

Card.displayName = "Card";
