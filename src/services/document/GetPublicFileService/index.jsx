import { headerConfig as headers } from "../../../core/httpHeaders";
import useSWR from "swr";
import { GetCall as get } from "../../../core/ApiAdapter";

export const GetPublicFileService = (endpoint, delay) => {
  const { config } = headers();
  const { data: resp, error, isLoading }
    = useSWR([endpoint, config], get, { refreshInterval: delay, });

  return {
    documents: resp?.data,
    isLoading,
    isError: error
  }
}