import connection from 'axios';

const post = async (url, payload, headers) => {
    return await connection.post(url, payload, headers);
}

const put = async (url, payload, headers)  => {
    return await connection.put(url, payload, headers);
}

const get = async (url, headers)  => {
    return await connection.get(url, headers);
}

const remove = async (url, headers)  => {
    return await connection.delete(url, headers);
}

export { post, put, get, remove }