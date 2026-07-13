import { ApiResponse, postForm as execute } from "../HttpClientConnector";

type MutationPayload<T> = { arg: T };

export const PostFormCall = async <TData = unknown, TPayload = unknown>(
  url: string,
  payload: MutationPayload<TPayload>,
): Promise<ApiResponse<TData>> => {
  const { arg } = payload;
  return await execute<TData>(`${url}`, arg);
};
