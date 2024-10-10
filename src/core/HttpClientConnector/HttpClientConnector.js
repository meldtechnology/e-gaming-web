import connection from 'axios';

const post = async (url, payload, headers) => {
    return await connection.post(url, payload, headers)
      .catch(e => {
          return {error: e?.response};
      });
}

const put = async (url, payload, headers)  => {
    return await connection.put(url, payload, headers)
      .catch(e => {
        return {error: e?.response};
      });
}

const get = async (url, headers)  => {
    return await connection.get(url, headers);
}

const remove = async (url, headers)  => {
    return await connection.delete(url, headers)
      .catch(e => {
        return {error: e?.response};
      });
}

export { post, put, get, remove }