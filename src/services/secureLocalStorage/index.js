import { encrypt, decrypt } from 'n-krypta';
import { encode, decode } from 'base-64';

const SECRET = process.env.REACT_APP_SECURE_LOCAL_STORAGE_HASH_KEY;
const PREFIX = process.env.REACT_APP_SECURE_LOCAL_STORAGE_PREFIX;
export const storeItem = (key, item) => {
  localStorage.setItem(`${PREFIX}.${key}`, encrypt(encode(item), SECRET));
  return null;
};

export const getItem = (key) => {
  try {
    return decode(decrypt(localStorage.getItem(`${PREFIX}.${key}`), SECRET));
  } catch (e) {
    return null;
  }
};

export const removeItem = (key) => {
  return localStorage.removeItem(`${PREFIX}.${key}`);
};
export const removeAll = () => {
  localStorage.clear();
  return null;
};

