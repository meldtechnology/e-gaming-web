import { headerConfig as headers } from "../../../core/httpHeaders";
import { PutCall as put } from "../../../core/ApiAdapter";
import useSWRMutation from "swr/mutation";
import { useAuthenticateCheck } from "../../useAuthenticateCheck";

export const UpdateDocumentService = ( endpoint, delay ) => {
  const { config } = headers();
  let { trigger, data: resp, error: err }
    = useSWRMutation([endpoint, config], put, {refreshInterval: delay});
// Check if an error occurred and was returned.
  if(resp?.error !== undefined) err = resp?.error;
  useAuthenticateCheck(err);

  return {
    modifyDocument: trigger,
    update: resp?.data,
    error: err?.data,
    isError: (err && err?.data?.status !== 200)
  }
}