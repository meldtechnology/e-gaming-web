import connection from 'axios';

const postForm = async (url, payload) => {
    return await connection.postForm(url, payload)
      .catch(e => {
          return {error: e?.response};
      });
}

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

export { postForm, post, put, get, remove }