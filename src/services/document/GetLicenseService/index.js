import useSWR from "swr";
import { GetCall as get } from "../../../core/ApiAdapter";
import { headerConfig as headers } from "../../../core/httpHeaders";

export const GetLicenseService = ( endpoint, delay ) => {
  const { config } = headers();
  const { data: resp, error, isLoading }
    = useSWR([endpoint, config], get, { refreshInterval: delay, });

  return {
    license: resp?.data,
    isLoading,
    isError: error
  }
}