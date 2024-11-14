import useSWR from "swr";
import { GetCall as get } from "../../../core/ApiAdapter";
import { headers } from "../../../core/httpHeaders/HttpHeaders";

export const GetFeeTypeService = ( endpoint, delay ) => {
  const { data: resp, error, isLoading }
    = useSWR([endpoint, headers], get, { refreshInterval: delay, });

  return {
    fees: resp?.data,
    loadingFee: isLoading,
    isError: error
  }
}