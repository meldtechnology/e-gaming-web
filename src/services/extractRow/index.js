const extractRowWithName = (data, item) => {
  return data.find(row => row.name === item)
}

const extractRowWithId = (data, item) => {
  return data.find(row => row.id === item)
}

const extractGroupWithId = (data, item) => {
  return data.find(row => row.groupId === item)
}

const extractTemplate = (template) => {
  const data = template?.data;
  return data?.map(templateData => templateData?.templateDetails)[0];
}

export { extractRowWithName, extractRowWithId, extractTemplate, extractGroupWithId }