import { env } from "../../config/env";
import type { AxiosRequestConfig } from "axios";
import { ApiResponse, post as execute } from "../HttpClientConnector";

const BASE_URI = env.BASE_URL;
type ApiKey = [string, AxiosRequestConfig?];
type MutationPayload<T> = { arg: T };

export const PostCall = async <TData = unknown, TPayload = unknown>(
  url: ApiKey,
  payload: MutationPayload<TPayload>,
): Promise<ApiResponse<TData>> => {
  return await execute<TData>(`${BASE_URI}${url[0]}`, payload?.arg, url[1]);
};
