import { headers } from "../../../core/httpHeaders/HttpHeaders";
import { PutCall as put } from "../../../core/ApiAdapter";
import useSWRMutation from "swr/mutation";

export const UpdateUserService = ( endpoint, delay ) => {
  const { trigger, error, data: resp }
    = useSWRMutation([endpoint, headers], put, {refreshInterval: delay});

  return {
    modifyPost: trigger,
    update: resp?.data,
    error,
    isError: error
  }
}