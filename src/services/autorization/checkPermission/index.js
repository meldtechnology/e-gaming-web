import { getItem } from "../../secureLocalStorage";

export const checkPermission = (name) => {
  const perm = getItem('perm');
  try {
    const permissionList = perm ? JSON.parse(perm)?.permissions : [];
    return permissionList?.includes(name) ?? false;
  } catch (_error) {
    return false;
  }
}
