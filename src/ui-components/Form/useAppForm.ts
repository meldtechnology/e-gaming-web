import { useMemo } from "react";
import { useFormik, type FormikConfig, type FormikHelpers, type FormikValues } from "formik";
import { createInitialValues } from "../../services/createInitialValues";
import { createSchema } from "../../services/createSchema";
import { updateForm } from "../../services/updateFormValues";

export type AppFormControl = {
  name?: string;
  label?: string;
  value?: unknown;
  required?: boolean;
  [key: string]: unknown;
};

export type AppFormGroup = {
  formControls?: AppFormControl[];
  [key: string]: unknown;
};

export type UseAppFormOptions<TValues extends FormikValues> = {
  formTemplate?: AppFormGroup[];
  initialValues?: TValues;
  validationSchema?: FormikConfig<TValues>["validationSchema"];
  onSubmit: (values: TValues, helpers: FormikHelpers<TValues>) => void | Promise<unknown>;
  enableReinitialize?: boolean;
  validateOnBlur?: boolean;
  validateOnChange?: boolean;
};

const cloneTemplate = (template: AppFormGroup[] = []) =>
  template.map((group) => ({
    ...group,
    formControls: group.formControls?.map((field) => ({ ...field })),
  }));

export const useAppForm = <TValues extends FormikValues = FormikValues>({
  formTemplate = [],
  initialValues,
  validationSchema,
  onSubmit,
  enableReinitialize = true,
  validateOnBlur = true,
  validateOnChange = true,
}: UseAppFormOptions<TValues>) => {
  const generatedInitialValues = useMemo(
    () => createInitialValues(formTemplate) as TValues,
    [formTemplate],
  );

  const generatedSchema = useMemo(
    () => createSchema(formTemplate),
    [formTemplate],
  );

  const formik = useFormik<TValues>({
    initialValues: initialValues ?? generatedInitialValues,
    validationSchema: validationSchema ?? generatedSchema,
    onSubmit,
    enableReinitialize,
    validateOnBlur,
    validateOnChange,
  });

  const buildTemplatePayload = (values: TValues = formik.values) => {
    return updateForm(cloneTemplate(formTemplate), values);
  };

  return {
    ...formik,
    buildTemplatePayload,
  };
};
