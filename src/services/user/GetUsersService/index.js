import useSWR from "swr";
import { GetCall as get } from "../../../core/ApiAdapter";
import { headers } from "../../../core/httpHeaders/HttpHeaders";

export const GetUsersService = ( endpoint, delay ) => {
  const { data: resp, error, isLoading }
    = useSWR([endpoint, headers], get, { refreshInterval: delay,
      // revalidateIfStale: false,
      // revalidateOnFocus: false,
      // revalidateOnReconnect: false
    });

  return {
    users: resp?.data,
    isLoading,
    isError: error
  }
}