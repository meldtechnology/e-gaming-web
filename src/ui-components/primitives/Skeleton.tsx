import { type HTMLAttributes } from "react";

export type SkeletonProps = HTMLAttributes<HTMLDivElement> & {
  lines?: number;
};

export const Skeleton = ({ lines = 1, className = "", ...props }: SkeletonProps) => (
  <div className={`animate-pulse ${className}`.trim()} aria-hidden="true" {...props}>
    {Array.from({ length: lines }).map((_, index) => (
      <div key={`skeleton-${index}`} className="h-4 my-2 rounded-md bg-surface-raised" />
    ))}
  </div>
);
