import { headers } from "../../../core/httpHeaders/HttpHeaders";
import { PutCall as put } from "../../../core/ApiAdapter";
import useSWRMutation from "swr/mutation";

export const UpdateDocumentService = ( endpoint, delay ) => {
  let { trigger, data: resp, error: err }
    = useSWRMutation([endpoint, headers], put, {refreshInterval: delay});
// Check if an error occurred and was returned.
  if(resp?.error !== undefined) err = resp?.error;

  return {
    modifyDocument: trigger,
    update: resp?.data,
    error: err?.data,
    isError: (err && err?.data?.status !== 200)
  }
}