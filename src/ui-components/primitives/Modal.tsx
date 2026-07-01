import { type ReactNode } from "react";

export type ModalProps = {
  open: boolean;
  title?: ReactNode;
  children: ReactNode;
  onClose: () => void;
  className?: string;
  labelledBy?: string;
};

export const Modal = ({ open, title, children, onClose, className = "", labelledBy }: ModalProps) => {
  if (!open) return null;

  return (
    <>
      <div className="fixed inset-0 bg-blue-300 bg-opacity-45 transition-opacity" aria-hidden="true" />
      <div className="fixed inset-0 z-10 w-screen h-screen" role="dialog" aria-modal="true" aria-labelledby={labelledBy}>
        <div className="flex mt-[2%] justify-center p-4 text-center sm:items-center sm:p-0">
          <div className={`relative bg-opacity-15 transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all ${className}`.trim()}>
            <div className="bg-white-a700 px-4 pb-4 pt-5 sm:p-6 sm:pb-4 block w-full">
              <button
                type="button"
                onClick={onClose}
                className="w-[10%] inline-flex rounded-xl px-3 py-2 text-sm font-semibold text-[#373737] hover:text-white-a700 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-red-400 sm:mt-0 sm:w-auto float-right"
              >
                <span className="min-w-full text-center">X</span>
              </button>
              {title ? <div id={labelledBy}>{title}</div> : null}
            </div>
            <div className="bg-white-a700 px-4 pb-4 pt-5 sm:p-6 sm:pb-4">{children}</div>
          </div>
        </div>
      </div>
    </>
  );
};
