import { PostFormCall as action } from "../../../core/ApiAdapter";
import useSWRMutation from "swr/mutation";


export const SendLogin = ( url ) => {
  let { trigger, data: resp, error: err }
    = useSWRMutation(url, action, {refreshInterval: 300});

  // Check if an error occurred and was returned.
  if(resp?.error !== undefined) err = resp?.error;

  return {
    postLogin: trigger,
    returnUrl: resp?.data,
    error: err?.data,
    isError: (err && err?.data?.status !== 200)
  }
}