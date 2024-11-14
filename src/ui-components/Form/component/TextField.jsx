export const TextField = ({formik, labelText, placeHolderText, required,
                            value, fieldName, error, errorText, fieldClass, isDisabled}) => (
  <div>
    <div className={fieldClass}>
      <label className="block mb-2 text-sm text-slate-600">
        {labelText} <span className={`${required? '':'hidden'} text-red-700`}>*</span>
      </label>
      <input type={`text`}
             name={fieldName}
             placeholder={placeHolderText}
             value={value}
             onChange={formik.handleChange}
             className="h-full rounded-[10px] border border-gray-500 px-3 md:w-full"
             disabled={isDisabled}
      />
      <p className="mt-1 text-1xl text-red-600 dark:text-red-500 bg-red-300">
        {errorText}
      </p>
    </div>
  </div>
);
