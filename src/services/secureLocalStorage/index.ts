import { env } from "../../config/env";
import { encrypt, decrypt } from 'n-krypta';
import { encode, decode } from 'base-64';

const SECRET = env.SECURE_LOCAL_STORAGE_HASH_KEY || "meld-app-storage";
const PREFIX = env.SECURE_LOCAL_STORAGE_PREFIX || "MELD-TECH";
const THEME_STORAGE_KEY = "themeMode";

const storageKey = (key: string) => `${PREFIX}.${key}`;

const canUseLocalStorage = () => typeof localStorage !== "undefined";

const normalizeItem = (item: unknown) => {
  return typeof item === "string" ? item : JSON.stringify(item);
};

export const storeItem = (key: string, item: unknown) => {
  if (!canUseLocalStorage()) return null;
  localStorage.setItem(storageKey(key), encrypt(encode(normalizeItem(item)), SECRET));
  return null;
};

export const getItem = (key: string) => {
  if (!canUseLocalStorage()) return null;
  try {
    return decode(decrypt(localStorage.getItem(storageKey(key)), SECRET));
  } catch (_error) {
    return null;
  }
};

export const removeItem = (key: string) => {
  if (!canUseLocalStorage()) return null;
  return localStorage.removeItem(storageKey(key));
};
export const removeAll = () => {
  if (!canUseLocalStorage()) return null;
  const preservedKeys = new Set([storageKey(THEME_STORAGE_KEY)]);
  Array.from({ length: localStorage.length }, (_, index) => localStorage.key(index))
    .filter((key): key is string => Boolean(key))
    .filter((key) => key.startsWith(`${PREFIX}.`) && !preservedKeys.has(key))
    .forEach((key) => localStorage.removeItem(key));
  return null;
};
