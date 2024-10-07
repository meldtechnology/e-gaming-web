import useSWR from "swr";
import { GetCall as get } from "../../../core/ApiAdapter";
import { headers } from "../../../core/httpHeaders/HttpHeaders";

export const GetUsersService = ( endpoint ) => {
  const { data: resp, error, isLoading }
    = useSWR([endpoint, headers], get);

  return {
    users: resp?.data,
    isLoading,
    isError: error
  }
}