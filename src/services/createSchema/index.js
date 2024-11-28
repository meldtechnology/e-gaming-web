import * as Yup from "yup";

export const createSchema = (formField) => {
  let validationSchema = {};

  const build = () => {
    formField?.map((group) =>
      group?.formControls?.map((field) => {
        if (field?.required) {
          validationSchema = { ...validationSchema, [field?.name]: Yup.string().required(`${field?.label} is required`)}
        }
        return validationSchema;
      })
    )
    return validationSchema;
  }

  return Yup.object(build());
}