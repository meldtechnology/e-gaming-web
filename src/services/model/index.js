import { v4 as uuid } from "uuid";

export const createGroup = () => {
  const uniqueId = uuid();
  return {
    headerTitle: 'New Category',
    groupId: uniqueId,
    formControls: []
  };
}

export const createFormField = () => {
  const uniqueId = uuid();
  return {
    fieldType: 'input',
    hints: 'Provide your text',
    label: 'Default Label',
    name: uniqueId.replaceAll('-', ''),
    options: [],
    required: false
  };
}
