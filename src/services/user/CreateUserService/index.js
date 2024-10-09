import useSWRMutation from "swr/mutation";
import { headers } from "../../../core/httpHeaders/HttpHeaders";
import { PostCall as post } from "../../../core/ApiAdapter";

export const CreateUserService = ( endpoint, delay ) => {
  const { trigger, error, data: resp }
    = useSWRMutation([endpoint, headers], post, {refreshInterval: delay});

  return {
    addNewPost: trigger,
    posts: resp?.data,
    error,
    isError: error
  }
}