import { headers } from "../../core/httpHeaders/HttpHeaders";
import { GetCall as get } from "../../core/ApiAdapter";
import useSWR from "swr";

export const GetRolesService = (endpoint, delay) => {
  const { data: resp, error: err, isLoading }
    = useSWR([endpoint, headers], get, {refreshInterval: delay});

  return {
    roles: resp?.data?.data,
    isLoading,
    error: err?.data,
  }
}