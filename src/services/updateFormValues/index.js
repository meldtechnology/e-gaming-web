const updateForm = (template, values) => {
  return template?.map(data => {
      data.formControls = updateField(data?.formControls, values);
      return data;
  })
}

const updateField = (formControls, values) => {
  return formControls?.map(field=> {
    if(values[field?.name]) field = {...field, value: values[field?.name] };
    return field;
  })
}

export { updateForm }