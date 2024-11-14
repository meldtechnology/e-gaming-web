export const InputEmail = ({name, value, label, placeHolderText, required ,onChange}) => (
  <div className="w-full min-w-[200px] my-2">
    <div className="relative">
      <input type="email"
             name={name}
             value={value}
             className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
             placeholder={label}
             required={required}
             onChange={onChange} />

      <svg xmlns="http://www.w3.org/2000/svg"
           fill="currentColor"
           className="absolute w-5 h-5 top-2.5 right-2.5 text-slate-600"
           viewBox="0 0 512 512">
        <path
          d="M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4L236.8 313.6c11.4 8.5 27 8.5 38.4 0L492.8 150.4c12.1-9.1 19.2-23.3 19.2-38.4c0-26.5-21.5-48-48-48L48 64zM0 176L0 384c0 35.3 28.7 64 64 64l384 0c35.3 0 64-28.7 64-64l0-208L294.4 339.2c-22.8 17.1-54 17.1-76.8 0L0 176z" />
      </svg>

      <p className="flex items-start mt-2 text-xs text-slate-400">
        <span className={`${required ? '' : 'hidden'} pl-2 text-red-700 text-2xl`}>*</span>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 mr-1.5">
          <path fillRule="evenodd"
                d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12ZM12 8.25a.75.75 0 0 1 .75.75v3.75a.75.75 0 0 1-1.5 0V9a.75.75 0 0 1 .75-.75Zm0 8.25a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z"
                clipRule="evenodd" />
        </svg>
        {placeHolderText}
      </p>
    </div>
  </div>
)