import type { AxiosRequestConfig } from "axios";
import { useEffect } from "react";
import useSWR, { type KeyedMutator, type SWRConfiguration } from "swr";
import { GetCall, type ApiError, type ApiResponse } from "../ApiAdapter";
import { headerConfig } from "../httpHeaders";
import { useAuthenticateCheck } from "../../services/useAuthenticateCheck";
import { reportApiError } from "../../monitoring/apiErrors";

type ApiKey = [string, AxiosRequestConfig?];

export type UseApiResult<T = unknown> = {
  data: T | undefined;
  response: ApiResponse<T> | undefined;
  isLoading: boolean;
  isError: boolean;
  error: ApiError | undefined;
  isEmpty: boolean;
  mutate: KeyedMutator<ApiResponse<T>>;
};

type UseApiOptions<T> = SWRConfiguration<ApiResponse<T>, ApiError>;

const toApiError = (error: unknown): ApiError | undefined => {
  if (!error) return undefined;
  if (typeof error === "object" && "message" in error) {
    return error as ApiError;
  }

  return {
    message: "Network request failed",
  };
};

const isEmptyValue = (value: unknown) => {
  if (value === undefined || value === null) return true;
  if (Array.isArray(value)) return value.length === 0;
  if (typeof value === "object") return Object.keys(value).length === 0;
  return false;
};

export const useApi = <T = unknown>(
  endpoint: string | null | undefined,
  delay?: number,
  options?: UseApiOptions<T>,
): UseApiResult<T> => {
  const { config } = headerConfig();
  const key: ApiKey | null = endpoint ? [endpoint, config] : null;

  const { data: response, error: swrError, isLoading, mutate } = useSWR<ApiResponse<T>, ApiError>(
    key,
    ([url, requestConfig]: ApiKey) => GetCall<T>([url, requestConfig]),
    {
      dedupingInterval: 2000,
      refreshInterval: delay,
      onErrorRetry: (error, _key, _config, revalidate, { retryCount }) => {
        if (error?.status === 401 || retryCount >= 3) return;
        setTimeout(() => revalidate({ retryCount }), 3000);
      },
      ...options,
    },
  );

  const error = response?.error ?? toApiError(swrError);
  useAuthenticateCheck(error);
  useEffect(() => {
    if (error) reportApiError(error, endpoint);
  }, [endpoint, error]);

  return {
    data: response?.data,
    response,
    isLoading,
    isError: Boolean(error),
    error,
    isEmpty: !isLoading && !error && isEmptyValue(response?.data),
    mutate,
  };
};
