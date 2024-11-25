import useSWR from "swr";
import { GetCall as get } from "../../../core/ApiAdapter";
import { headerConfig as headers } from "../../../core/httpHeaders";
import { useAuthenticateCheck } from "../../useAuthenticateCheck";

export const GetFeeTypeService = ( endpoint, delay ) => {
  const { config } = headers();
  const { data: resp, error, isLoading }
    = useSWR([endpoint, config], get, { refreshInterval: delay, });

  useAuthenticateCheck(error);

  return {
    fees: resp?.data,
    loadingFee: isLoading,
    isError: error
  }
}