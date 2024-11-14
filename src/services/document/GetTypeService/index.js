import useSWR from "swr";
import { GetCall as get } from "../../../core/ApiAdapter";
import { headers } from "../../../core/httpHeaders/HttpHeaders";

export const GetTypeService = ( endpoint, delay ) => {
  const { data: resp, error, isLoading }
    = useSWR([endpoint, headers], get, { refreshInterval: delay, });

  return {
    types: resp?.data,
    loadingTypes: isLoading,
    isError: error
  }
}