import { useApi } from "../../../core/data/useApi";

export const GetDocumentService = ( endpoint, delay ) => {
  const { data, error, isLoading, isEmpty, mutate } = useApi(endpoint, delay);

  return {
    documents: data,
    isLoading,
    isError: error,
    isEmpty,
    mutate
  }
}
