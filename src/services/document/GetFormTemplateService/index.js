import useSWR from "swr";
import { headerConfig as headers } from "../../../core/httpHeaders";
import { GetCall as get } from "../../../core/ApiAdapter";
import { useAuthenticateCheck } from "../../useAuthenticateCheck";

export const GetFormTemplateService = ( endpoint, delay ) => {
  const { config } = headers();
  const { data: resp, error, isLoading }
    = useSWR([endpoint, config], get, { refreshInterval: delay, });

  useAuthenticateCheck(error);

  return {
    template: resp?.data,
    loadingTemplate: isLoading,
    isError: error
  }
}