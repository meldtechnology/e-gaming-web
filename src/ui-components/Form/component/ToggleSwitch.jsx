export const ToggleSwitch = ({formik, labelText, required,
                               value, fieldName, fieldClass, isDisabled}) => (
  <div className={fieldClass}>
    <label className="mb-2 mr-4 text-sm font-medium text-text-secondary">
      {labelText} <span className={`${required ? '' : 'hidden'} text-danger`}>*</span>
    </label>
    <div className="inline-flex items-center gap-2">
      <label htmlFor="switch-component-on" className="cursor-pointer text-sm text-text-secondary">Off</label>

      <div className="relative inline-block h-5 w-11">
        <input id="switch-component-on" type="checkbox"
               name={fieldName}
               value={value}
               onChange={formik.handleChange}
               checked={value}
               disabled={isDisabled}
               className="peer h-5 w-11 cursor-pointer appearance-none rounded-full bg-surface-raised transition-colors duration-300 checked:bg-brand" />
        <span aria-hidden="true"
              className="absolute left-0 top-0 h-5 w-5 cursor-pointer rounded-full border border-border bg-surface shadow-sm transition-transform duration-300 peer-checked:translate-x-6 peer-checked:border-brand">
        </span>
      </div>

      <label htmlFor="switch-component-on" className="cursor-pointer text-sm text-text-secondary">On</label>
    </div>
  </div>
)
