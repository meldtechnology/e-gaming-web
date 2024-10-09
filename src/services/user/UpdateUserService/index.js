import useSWR from "swr";
import { PutCall as put } from "../../../core/ApiAdapter";
import { headers } from "../../../core/httpHeaders/HttpHeaders";

export const UpdateUserService = ( endpoint, payload ) => {
  const { data: resp, error, isLoading }
    = useSWR([endpoint, payload, headers], put);

  return {
    users: resp?.data,
    isLoading,
    isError: error
  }
}