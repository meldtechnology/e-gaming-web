import {remove as execute} from "../HttpClientConnector";

const BASE_URI = process.env.REACT_APP_BASE_URL;
export const DeleteCall = async (url) => {
    return await execute(`${BASE_URI}${url[0]}`,  url[1])
}