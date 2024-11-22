import { headerConfig as headers } from "../../core/httpHeaders";
import { GetCall as get } from "../../core/ApiAdapter";
import useSWR from "swr";
import { useAuthenticateCheck } from "../useAuthenticateCheck";

export const GetRolesService = (endpoint, delay) => {
  const { config } = headers();
  const { data: resp, error: err, isLoading }
    = useSWR([endpoint, config], get, {refreshInterval: delay});

  useAuthenticateCheck(err);

  return {
    roles: resp?.data?.data,
    isLoading,
    error: err?.data,
  }
}