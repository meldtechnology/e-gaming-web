import React from "react";
import { Img } from "../Img";

const MENU_ITEMS = {
  DASHBOARD: "dashboard",
  APPLICATIONS: "applications",
  LICENSES: "licenses",
  REPORT: "report",
  DOCUMENTS: "documents",
  USERS: "users",
  SETTINGS: "settings",
};

const activeStatus = ( icon, fromUrl, fromEnum ) => {
  return (  (fromUrl === fromEnum) ? "/images/menu/active/".concat(icon) :
    "/images/menu/".concat(icon) );
}

const isItemSelected = (fromUrl, fromEnum) => {
   return (fromUrl === fromEnum) ?
     <Img src="/images/menu/active/Rectangle%2038_active.svg"
          alt="Active"
          className="h-[42px]" />
     : null;
}

const activeSelection = (itemName, fromUrl, fromEnum) => {
  return (fromUrl === fromEnum) ?
    <span style={{ color: '#276df9'}}>{itemName}</span> : itemName;
}

export { MENU_ITEMS, activeStatus, isItemSelected, activeSelection };