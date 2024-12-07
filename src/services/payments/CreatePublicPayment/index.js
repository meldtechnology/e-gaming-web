import { headerConfig as headers } from "../../../core/httpHeaders";
import useSWRMutation from "swr/mutation";
import { PostCall as postCall } from "../../../core/ApiAdapter";

export const CreatePublicPayment = (endpoint, delay ) => {
  const { config } = headers();
  let { trigger, data: resp, error: err }
    = useSWRMutation([endpoint, config], postCall, { refreshInterval: delay });

  // Check if an error occurred and was returned.
  if (resp?.error !== undefined) err = resp?.error;

  return {
    addPayment: trigger,
    invoices: resp?.data,
    error: err?.data,
    isError: (err && err?.data?.status !== 200)
  }

}