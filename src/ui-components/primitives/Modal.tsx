import { useEffect, type ReactNode } from "react";

export type ModalProps = {
  open: boolean;
  title?: ReactNode;
  children: ReactNode;
  onClose: () => void;
  className?: string;
  labelledBy?: string;
};

export const Modal = ({ open, title, children, onClose, className = "", labelledBy }: ModalProps) => {
  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto p-4 sm:items-center">
      <div
        className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm transition-opacity"
        aria-hidden="true"
        onClick={onClose}
      />
      <div
        className={`relative z-10 my-8 w-full max-w-lg overflow-hidden rounded-2xl border border-border bg-surface text-left text-text-primary shadow-e3 transition-all ${className}`.trim()}
        role="dialog"
        aria-modal="true"
        aria-labelledby={labelledBy}
      >
        <div className="flex items-start justify-between gap-4 border-b border-border px-5 py-4">
          <div id={labelledBy} className="min-w-0 flex-1">
            {title}
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close dialog"
            className="inline-flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg text-text-secondary transition-colors hover:bg-surface-raised hover:text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
          >
            <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <path d="M5 5l10 10M15 5L5 15" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          </button>
        </div>
        <div className="px-5 py-5">{children}</div>
      </div>
    </div>
  );
};
