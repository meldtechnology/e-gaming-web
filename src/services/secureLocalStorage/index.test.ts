import { beforeEach, describe, expect, it } from "vitest";
import { getItem, removeAll, storeItem } from "./index";
import { checkPermission } from "../autorization/checkPermission";

const createLocalStorage = () => {
  const store = new Map<string, string>();

  return {
    get length() {
      return store.size;
    },
    key(index: number) {
      return Array.from(store.keys())[index] ?? null;
    },
    getItem(key: string) {
      return store.get(key) ?? null;
    },
    setItem(key: string, value: string) {
      store.set(key, value);
    },
    removeItem(key: string) {
      store.delete(key);
    },
    clear() {
      store.clear();
    },
  } as Storage;
};

beforeEach(() => {
  Object.defineProperty(globalThis, "localStorage", {
    configurable: true,
    value: createLocalStorage(),
  });
});

describe("secureLocalStorage", () => {
  it("round-trips string and object values", () => {
    storeItem("token", "abc123");
    storeItem("profile", { name: "Meld" });

    expect(getItem("token")).toBe("abc123");
    expect(getItem("profile")).toBe('{"name":"Meld"}');
  });

  it("clears app-scoped auth data without clearing theme or unrelated keys", () => {
    storeItem("themeMode", "dark");
    storeItem("at", "token");
    localStorage.setItem("OTHER.at", "external");

    removeAll();

    expect(getItem("themeMode")).toBe("dark");
    expect(getItem("at")).toBeNull();
    expect(localStorage.getItem("OTHER.at")).toBe("external");
  });
});

describe("checkPermission", () => {
  it("fails closed when persisted permissions are malformed", () => {
    storeItem("perm", "{malformed-json");

    expect(checkPermission("CAN_VIEW_USERS")).toBe(false);
  });
});
