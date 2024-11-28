export const createInitialValues = (formField) => {
  let fieldStr = {};

  const build = () => {
    formField?.map((group) =>
      group?.formControls?.map((field) => {
        fieldStr = { ...fieldStr, [field?.name]: ""}
        return fieldStr;
      })
    )
    return fieldStr;
  }

  return build();
}