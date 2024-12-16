import { headerConfig as headers } from "../../../core/httpHeaders";
import useSWR from "swr";
import { GetCall as get } from "../../../core/ApiAdapter";
import { useAuthenticateCheck } from "../../useAuthenticateCheck";

export const GetPaymentService = ( endpoint, delay ) => {
  const { config } = headers();
  const { data: resp, error, isLoading }
    = useSWR([endpoint, config], get, { refreshInterval: delay, });

  useAuthenticateCheck(error);

  return {
    payments: resp?.data,
    isLoading,
    isError: error
  }
}