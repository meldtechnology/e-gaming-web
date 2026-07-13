export const TextField = ({formik, labelText, placeHolderText, required,
                            value, fieldName, error, errorText, fieldClass, isDisabled}) => (
  <div>
    <div className={fieldClass}>
      <label className="mb-1.5 block text-sm font-medium text-text-secondary">
        {labelText} <span className={`${required? '':'hidden'} text-danger`}>*</span>
      </label>
      <input type={`text`}
             name={fieldName}
             placeholder={placeHolderText}
             value={value}
             onChange={formik.handleChange}
             aria-invalid={Boolean(errorText)}
             className="w-full rounded-xl border border-border bg-surface px-3.5 py-2.5 text-sm text-text-primary transition-colors placeholder:text-text-muted hover:border-border-strong focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/40 disabled:cursor-not-allowed disabled:bg-surface-muted aria-[invalid=true]:border-danger"
             disabled={isDisabled}
      />
      {errorText ? (
        <p className="mt-1.5 text-xs text-danger">
          {errorText}
        </p>
      ) : null}
    </div>
  </div>
);
