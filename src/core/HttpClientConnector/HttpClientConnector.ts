import connection, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";

export type ApiError = {
  status?: number;
  code?: string;
  message: string;
  userMessage?: string;
  data?: unknown;
};

export type ApiResponse<T = unknown> = {
  data?: T;
  error?: ApiError;
  status?: number;
  headers?: AxiosResponse["headers"];
};

const toApiResponse = <T>(response: AxiosResponse<T>): ApiResponse<T> => ({
  data: response.data,
  status: response.status,
  headers: response.headers,
});

export const normalizeError = (error: unknown): ApiError => {
  const axiosError = error as AxiosError<{ userMessage?: string; message?: string; code?: string }>;
  const response = axiosError.response;
  const responseData = response?.data;

  return {
    status: response?.status,
    code: responseData?.code ?? axiosError.code,
    message: responseData?.message ?? axiosError.message ?? "Network request failed",
    userMessage: responseData?.userMessage,
    data: responseData,
  };
};

const request = async <T>(executor: () => Promise<AxiosResponse<T>>): Promise<ApiResponse<T>> => {
  try {
    return toApiResponse(await executor());
  } catch (error) {
    return { error: normalizeError(error) };
  }
};

const postForm = async <T = unknown>(url: string, payload: unknown) =>
  request<T>(() => connection.postForm(url, payload));

const post = async <T = unknown>(url: string, payload: unknown, headers?: AxiosRequestConfig) =>
  request<T>(() => connection.post(url, payload, headers));

const put = async <T = unknown>(url: string, payload: unknown, headers?: AxiosRequestConfig) =>
  request<T>(() => connection.put(url, payload, headers));

const get = async <T = unknown>(url: string, headers?: AxiosRequestConfig) =>
  request<T>(() => connection.get(url, headers));

const remove = async <T = unknown>(url: string, headers?: AxiosRequestConfig) =>
  request<T>(() => connection.delete(url, headers));

export { postForm, post, put, get, remove };
