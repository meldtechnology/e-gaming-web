import { useApi } from "../../../core/data/useApi";

export const GetUsersService = ( endpoint, delay ) => {
  const { data, error, isLoading, isEmpty, mutate } = useApi(endpoint, delay);

  return {
    users: data,
    isLoading,
    isError: error,
    isEmpty,
    mutate
  }
}
