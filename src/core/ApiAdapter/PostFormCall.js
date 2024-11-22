import { postForm as execute } from '../HttpClientConnector';

export const PostFormCall = async (url, payload) => {
  const { arg } = payload;
  return await execute(`${url}`, arg)
}