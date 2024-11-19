import useSWRMutation from "swr/mutation";
import { headers } from "../../../core/httpHeaders/HttpHeaders";
import { PostCall as postCall } from "../../../core/ApiAdapter";

export const CreateAuthService = ( endpoint, delay ) => {
  let { trigger, data: resp, error: err }
    = useSWRMutation([endpoint, headers], postCall, {refreshInterval: delay});

  // Check if an error occurred and was returned.
  if(resp?.error !== undefined) err = resp?.error;

  return {
    getToken: trigger,
    accessTokenData: resp?.data,
    error: err?.data,
    isError: (err && err?.data?.status !== 200)
  }
}