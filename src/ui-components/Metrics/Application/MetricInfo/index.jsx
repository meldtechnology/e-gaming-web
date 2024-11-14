
export const MetricInfo = ({ docInfoText = "", docCount = "0", color, ...props }) => {
  return (
    <div {...props} className={`${props.className} flex items-center w-[32%] md:w-full`}>
      <div className="flex w-full items-start justify-between gap-4 px-1 py-3 sm:py-5">
        <div className="flex w-[65%] flex-col items-start">
          <div className="relative inline-flex">
            <button
              className="rounded-md bg-slate-800 py-2 px-4 border border-transparent text-center text-sm text-white-a700 transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              type="button">
              {docInfoText}
            </button>
            <span
              className={`absolute top-0.5 right-0.5 grid min-h-[24px] min-w-[24px] translate-x-2/4 -translate-y-2/4 place-items-center rounded-full ${color} py-1 px-1 text-xs text-white-a700`}>
              {docCount}
            </span>
          </div>
          </div>
        </div>
      </div>
      );
      }