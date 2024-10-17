import useSWR from "swr";
import { GetCall as get } from "../../../core/ApiAdapter";
import { headers } from "../../../core/httpHeaders/HttpHeaders";

export const GetUsersService = ( endpoint, delay ) => {
  const { data: resp, error, isLoading }
<<<<<<< HEAD
    = useSWR([endpoint, headers], get, {refreshInterval: delay});
=======
    = useSWR([endpoint, headers], get, { refreshInterval: delay,
      // revalidateIfStale: false,
      // revalidateOnFocus: false,
      // revalidateOnReconnect: false
    }
  );
>>>>>>> 47a4933 (Egaming Admin User Mgmt)

  return {
    users: resp?.data,
    isLoading,
    isError: error
  }
}