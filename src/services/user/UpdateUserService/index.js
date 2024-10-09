<<<<<<< HEAD
import useSWR from "swr";
import { PutCall as put } from "../../../core/ApiAdapter";
import { headers } from "../../../core/httpHeaders/HttpHeaders";

export const UpdateUserService = ( endpoint, payload ) => {
  const { data: resp, error, isLoading }
    = useSWR([endpoint, payload, headers], put);

  return {
    users: resp?.data,
    isLoading,
=======
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
>>>>>>> ca861936bb6fb9a6fb1772cc42cdb1d98e1e9573
    isError: error
  }
}