import type { ApiError } from "../core/ApiAdapter";

type ApiErrorEvent = {
  endpoint?: string;
  status?: number;
  code?: string;
  message: string;
  userMessage?: string;
};

type ApiErrorSink = (event: ApiErrorEvent) => void;

declare global {
  interface Window {
    __ESGC_API_ERROR__?: ApiErrorSink;
  }
}

const sanitizeEndpoint = (endpoint?: string | null) => endpoint?.split("?")[0];

export const reportApiError = (error: ApiError, endpoint?: string | null) => {
  const event: ApiErrorEvent = {
    endpoint: sanitizeEndpoint(endpoint),
    status: error.status,
    code: error.code,
    message: error.message,
    userMessage: error.userMessage,
  };

  if (import.meta.env.DEV) {
    console.warn("[api-error]", event);
  }

  window.__ESGC_API_ERROR__?.(event);
};

export type { ApiErrorEvent };
