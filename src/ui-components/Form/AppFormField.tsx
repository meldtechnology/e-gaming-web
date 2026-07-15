import type { ChangeEvent, InputHTMLAttributes, SelectHTMLAttributes, TextareaHTMLAttributes } from "react";
import type { FormikProps, FormikValues } from "formik";

type FieldOption = {
  label: string;
  value: string | number;
};

type SharedFieldProps<TValues extends FormikValues> = {
  formik: FormikProps<TValues>;
  name: string;
  label?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
  fieldClassName?: string;
  options?: FieldOption[];
};

export type AppFormFieldProps<TValues extends FormikValues = FormikValues> =
  SharedFieldProps<TValues> &
    Omit<InputHTMLAttributes<HTMLInputElement>, "name" | "value" | "onChange"> &
    Omit<SelectHTMLAttributes<HTMLSelectElement>, "name" | "value" | "onChange"> &
    Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "name" | "value" | "onChange"> & {
      as?: "input" | "select" | "textarea";
      type?: InputHTMLAttributes<HTMLInputElement>["type"];
    };

const baseFieldClass =
  "w-full rounded-xl border border-border bg-surface px-3.5 py-2.5 text-sm text-text-primary transition-colors placeholder:text-text-muted hover:border-border-strong focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/40 disabled:cursor-not-allowed disabled:bg-surface-muted disabled:text-text-muted aria-[invalid=true]:border-danger";

const getFieldValue = <TValues extends FormikValues>(formik: FormikProps<TValues>, name: string) => {
  const value = formik.values[name];
  if (value === undefined || value === null) return "";
  return value as string | number | readonly string[];
};

const getErrorText = <TValues extends FormikValues>(formik: FormikProps<TValues>, name: string) => {
  const touched = formik.touched[name];
  const error = formik.errors[name];
  return touched && typeof error === "string" ? error : "";
};

export const AppFormField = <TValues extends FormikValues = FormikValues>({
  formik,
  name,
  label,
  placeholder,
  required,
  disabled,
  className = "",
  fieldClassName = "",
  options = [],
  as = "input",
  type = "text",
  ...props
}: AppFormFieldProps<TValues>) => {
  const errorText = getErrorText(formik, name);
  const value = getFieldValue(formik, name);
  const fieldId = props.id ?? name;
  const commonProps = {
    id: fieldId,
    name,
    value,
    disabled,
    required,
    "aria-invalid": Boolean(errorText),
    "aria-describedby": errorText ? `${fieldId}-error` : undefined,
    className: `${baseFieldClass} ${fieldClassName}`.trim(),
    onBlur: formik.handleBlur,
  };

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => formik.handleChange(event);

  return (
    <div className={className}>
      {label ? (
        <label className="mb-1.5 block text-sm font-medium text-text-secondary" htmlFor={fieldId}>
          {label} <span className={`${required ? "" : "hidden"} text-danger`}>*</span>
        </label>
      ) : null}

      {as === "select" ? (
        <select {...commonProps} {...props} onChange={handleChange}>
          {options.map((option) => (
            <option key={`${option.value}`} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : null}

      {as === "textarea" ? (
        <textarea
          {...commonProps}
          {...props}
          placeholder={placeholder}
          onChange={handleChange}
        />
      ) : null}

      {as === "input" ? (
        <input
          {...commonProps}
          {...props}
          type={type}
          placeholder={placeholder}
          onChange={handleChange}
        />
      ) : null}

      {errorText ? (
        <p id={`${fieldId}-error`} className="mt-1.5 text-xs text-danger">
          {errorText}
        </p>
      ) : null}
    </div>
  );
};
