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
  "h-full rounded-[10px] border border-gray-500 px-3 md:w-full";

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
        <label className="block mb-2 text-sm text-slate-600" htmlFor={fieldId}>
          {label} <span className={`${required ? "" : "hidden"} text-red-700`}>*</span>
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

      <p id={`${fieldId}-error`} className="mt-1 text-1xl text-red-600 dark:text-red-500 bg-red-300">
        {errorText}
      </p>
    </div>
  );
};
