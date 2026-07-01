import { useApi } from "../../../core/data/useApi";

export const GetPaymentService = ( endpoint, delay ) => {
  const { data, error, isLoading, isEmpty, mutate } = useApi(endpoint, delay);

  return {
    payments: data,
    isLoading,
    isError: error,
    isEmpty,
    mutate
  }
}
