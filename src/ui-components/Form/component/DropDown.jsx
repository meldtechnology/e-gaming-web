import { Select } from "@headlessui/react";

export const DropDown = ({formik, labelText, fieldName, required, placeholderText, value,
                           error, errorText, selOptions, onChange, fieldClass, isDisabled}) => (
  <div className={fieldClass}>
    <label id="demo-simple-select"
           className="block mb-2 text-sm text-slate-600">
      {labelText} <span className={`${required ? "" : "hidden"} text-red-700`}>*</span>
    </label>
    <Select
      id="demo-simple-select"
      label={labelText}
      defaultValue=""
      name={fieldName}
      onChange={onChange}
      error={error}
      className={fieldClass}
      disabled={isDisabled}
    >
      <option value=''>{value}</option>
      {(selOptions?.map((item, index) => (
        <option value={item.name} key={`role-${index}`}>{item.name}</option>
      )))}
    </Select>
    <p className="flex items-center mt-2 text-xs text-slate-500">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-5 h-5 mr-2"
      >
        <path
          fillRule="evenodd"
          d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 01.67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 11-.671-1.34l.041-.022zM12 9a.75.75 0 100-1.5.75.75 0 000 1.5z"
          clipRule="evenodd"
        ></path>
      </svg>
      {placeholderText}
    </p>
    <p style={{ padding: '2% 1%', color: 'red' }}>
      {errorText}
    </p>
  </div>
)