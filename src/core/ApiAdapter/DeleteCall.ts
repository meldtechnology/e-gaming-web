import { env } from "../../config/env";
import type { AxiosRequestConfig } from "axios";
import { ApiResponse, remove as execute } from "../HttpClientConnector";

const BASE_URI = env.BASE_URL;
type ApiKey = [string, AxiosRequestConfig?];

export const DeleteCall = async <T = unknown>(url: ApiKey): Promise<ApiResponse<T>> => {
  return await execute<T>(`${BASE_URI}${url[0]}`, url[1]);
};
