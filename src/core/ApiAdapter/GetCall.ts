import { env } from "../../config/env";
import type { AxiosRequestConfig } from "axios";
import { ApiResponse, get as execute } from "../HttpClientConnector";

const BASE_URI = env.BASE_URL;
type ApiKey = [string, AxiosRequestConfig?];

export const GetCall = async <T = unknown>(url: ApiKey): Promise<ApiResponse<T>> => {
  return await execute<T>(`${BASE_URI}${url[0]}`, url[1]);
};
