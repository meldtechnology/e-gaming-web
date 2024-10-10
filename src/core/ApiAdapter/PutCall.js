import {put as execute} from "../HttpClientConnector";

const BASE_URI = process.env.REACT_APP_BASE_URL;
export const PutCall = async (url, payload) => {
    return await execute(`${BASE_URI}${url[0]}`, payload?.arg, url[1])
}