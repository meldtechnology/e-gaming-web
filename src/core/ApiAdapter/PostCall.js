import { post as execute } from '../HttpClientConnector';
import {headers} from "../httpHeaders/HttpHeaders";

const BASE_URI = process.env.REACT_APP_BASE_URL;
export const PostCall = async (url, payload) => {
    return await execute(`${BASE_URI}${url}`, payload, headers)
}