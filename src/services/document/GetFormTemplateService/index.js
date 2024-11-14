import useSWR from "swr";
import { headers } from "../../../core/httpHeaders/HttpHeaders";
import { GetCall as get } from "../../../core/ApiAdapter";

export const GetFormTemplateService = ( endpoint, delay ) => {
  const { data: resp, error, isLoading }
    = useSWR([endpoint, headers], get, { refreshInterval: delay, });

  return {
    template: resp?.data,
    loadingTemplate: isLoading,
    isError: error
  }
}