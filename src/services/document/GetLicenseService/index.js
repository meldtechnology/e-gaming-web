import useSWR from "swr";
import { GetCall as get } from "../../../core/ApiAdapter";
import { headerConfig as headers } from "../../../core/httpHeaders";

export const GetLicenseService = ( endpoint, delay ) => {
  const { config } = headers();
  const key = endpoint ? [endpoint, config] : null;
  const { data: resp, error, isLoading, mutate }
    = useSWR(key, get, { refreshInterval: delay, });

  return {
    license: resp?.data,
    isLoading,
    isError: error,
    mutate
  }
}
