import connection from 'axios';

const postForm = async (url, payload) => {
    console.clear();
    return await connection.postForm(url, payload)
      .catch(e => {
          console.clear();
          return {error: e?.response};
      });
}

const post = async (url, payload, headers) => {
  console.clear();
    return await connection.post(url, payload, headers)
      .catch(e => {
          console.clear();
          return {error: e?.response};
      });
}

const put = async (url, payload, headers)  => {
  console.clear();
    return await connection.put(url, payload, headers)
      .catch(e => {
        console.clear();
        return {error: e?.response};
      });
}

const get = async (url, headers)  => {
  console.clear();
    return await connection.get(url, headers);
}

const remove = async (url, headers)  => {
  console.clear();
    return await connection.delete(url, headers)
      .catch(e => {
        console.clear();
        return {error: e?.response};
      });
}

export { postForm, post, put, get, remove }