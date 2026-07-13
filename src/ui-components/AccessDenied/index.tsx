import { type ReactNode } from "react";

export type AccessDeniedProps = {
  title?: string;
  message?: ReactNode;
};

/** Consistent permission-gate fallback for admin screens. */
export const AccessDenied = ({
  title = "Access denied",
  message = "You do not have sufficient access to view this screen.",
}: AccessDeniedProps) => (
  <div className="flex min-h-[60vh] flex-col items-center justify-center gap-6 text-center">
    <img
      src="/images/enugu_logo2.png"
      alt="Enugu State Gaming Commission"
      className="h-24 w-24 object-contain opacity-90"
    />
    <div>
      <h2 className="text-2xl font-bold text-danger">{title}</h2>
      <p className="mt-2 max-w-md text-text-secondary">{message}</p>
    </div>
  </div>
);
