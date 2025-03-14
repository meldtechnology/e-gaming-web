import { getItem } from "../../secureLocalStorage";

export const checkPermission = (name) => {
  const perm = getItem('perm');
  let permissionList = [];
  if(perm) permissionList = JSON.parse(perm)?.permissions;
  const isAuthorized = permissionList?.findIndex(item => item === name);
  return (isAuthorized > -1) ? '' : 'hidden';
}