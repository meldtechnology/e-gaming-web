import { headerConfig as headers } from "../../../core/httpHeaders";
import { PostCall as postCall } from "../../../core/ApiAdapter";
import useSWRMutation from "swr/mutation";

export const UserVerificationService = (endpoint, delay) => {
  const { config } = headers();
  let { trigger, data: resp, error: err }
    = useSWRMutation([endpoint, config], postCall, {refreshInterval: delay});

  // Check if an error occurred and was returned.
  if(resp?.error !== undefined) err = resp?.error;

  return {
    verify: trigger,
    verification: resp?.data,
    error: err?.data,
    isError: (err && err?.data?.status !== 200)
  }
}