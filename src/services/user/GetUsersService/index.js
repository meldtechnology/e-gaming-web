import useSWR from "swr";
import { GetCall as get } from "../../../core/ApiAdapter";
import { headerConfig as headers } from "../../../core/httpHeaders";
import { useAuthenticateCheck } from "../../useAuthenticateCheck";

export const GetUsersService = ( endpoint, delay ) => {
  const { config } = headers();
  const { data: resp, error, isLoading }
    = useSWR([endpoint, config], get, { refreshInterval: delay,
      // revalidateIfStale: false,
      // revalidateOnFocus: false,
      // revalidateOnReconnect: false
    });

  useAuthenticateCheck(error);

  return {
    users: resp?.data,
    isLoading,
    isError: error
  }
}