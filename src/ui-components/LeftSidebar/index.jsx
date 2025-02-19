import { React, useEffect, useState } from "react";
import { Img, Text, Heading } from './..';
import { MenuItem, Menu, Sidebar } from "react-pro-sidebar";
import { activeSelection, activeStatus, isItemSelected, MENU_ITEMS } from "../ActiveStatus";
import { Link, useLocation } from "react-router-dom";
import { getItem } from "../../services";
import { checkPermission } from "../../services/autorization";


export const LeftSidebar = ({ ...props }) => {
  const [collapsed, ] = useState(false);
  const location = useLocation();
  const [pathName, ] = useState(location.pathname
    .substring(location.pathname
      .lastIndexOf('/') + 1) );
  const [user, setUser] = useState({});

  // const collapseSidebar = () => {
  //    setCollapsed(!collapsed)
  // }
  const userName = (name) => {
    return name.substring(0, 13);
  }

  useEffect(() => {
    setUser(JSON.parse(getItem('profile')));
  }, []);

  return (
    <Sidebar
      {...props}
      width="244px !important"
      collapsedWidth="80px !important"
      collapsed={collapsed}
      className={`${props.className} flex flex-col h-screen pt-2.5 top-0 bg-blue_gray-900_01 !sticky overflow-auto`}
    >
      <div className="mx-3 mt-6 self-stretch">
        <div className="flex flex-col bg-black-900 py-2 items-center gap-1 rounded-[10px]">
          <div className="flex items-center justify-center gap-2.5 self-stretch">
            <Img src="/images/enugu_logo2.png" alt="Subtract" className="h-[42px] w-[42] object-cover" />
            <Text as="p" className="text-[16px] font-light text-white-a700 !important">
              ESGC
            </Text>
          </div>
          <Heading as="h6" className="font-inter text-1 font-bold text-gray-600">
            Dashboard
          </Heading>
        </div>
        {!collapsed ? (
          <div
            className={`${checkPermission('CAN_VIEW_PROFILE')} w-full ml-2 mr-2.5 flex items-center justify-center gap-2 self-stretch rounded-[10px] bg-gray-800 px-1 py-1.5`}>
            <Img
              src={user?.profile?.profilePicture}
              alt="Image"
              className="h-[66px] w-[30%] rounded-full object-contain"
            />
            <div className="flex flex-1 flex-col items-start">
              <Text size="textmd" as="p" className="text-[16px] font-light text-white-a700 cursor-pointer">
                <Link to={`/app/users/profile`} >
                  {userName(`${user?.profile?.firstName} ${user?.profile?.lastName}`)}
                </Link>
              </Text>
              <Text size="sm" as="p" className="text-[12px] font-bold text-blue_gray-400">
                {user?.profile?.settings?.role?.substring(0, 13)}
              </Text>
            </div>
            <Link to={`/logout`} >
              <Img src="/images/img_arrow_down.svg" alt="Arrowdown" className="mt-[18px] h-[24px] w-[24px] self-start" />
            </Link>
          </div>
        ) : null}
        <Menu
          menuItemStyles={{
            button: {
              padding: "16px",
              color: "#707073",
              fontWeight: 400,
              fontSize: "24px",
              gap: "15px",
              [`&:hover, &.ps-active`]: { color: "#276df9", background: "linear-gradient(90deg, #536bb57f,#f8f5f500)" },
            },
          }}
          className="mt-9 w-full self-stretch"
        >
          <div>
            <MenuItem icon={<Img src={activeStatus( "img_grid.svg", pathName, MENU_ITEMS.DASHBOARD)}
                                 alt="Dashboard"
                                 className="h-[42px] w-[42px]" />}
                      className={checkPermission('CAN_VIEW_DASHBOARD')}
                      href={'/app/dashboard'}>
              {activeSelection("Dashboard", pathName, MENU_ITEMS.DASHBOARD)}
              { isItemSelected(pathName, MENU_ITEMS.DASHBOARD) }
            </MenuItem>
            <div className="flex flex-col gap-[2.66px]">
              <MenuItem icon={<Img src={activeStatus( "img_checkmark.svg", pathName, MENU_ITEMS.DOCUMENTS)}
                                   alt="Document"
                                   className="h-[40px] w-[40px]" />}
                        className={checkPermission('CAN_VIEW_DOCUMENTS')}
                        href={'/app/documents'}>
                {activeSelection("Documents", pathName, MENU_ITEMS.DOCUMENTS)}
                { isItemSelected(pathName, MENU_ITEMS.DOCUMENTS) }
              </MenuItem>
              <MenuItem icon={<Img src={activeStatus( "img_application.svg", pathName, MENU_ITEMS.APPLICATIONS)}
                                   alt="Applications"
                                   className="h-[34px] w-[34px]" />}
                        className={checkPermission('CAN_VIEW_APPLICATIONS')}
                        href={'/app/applications'}>
                {activeSelection("Applications", pathName, MENU_ITEMS.APPLICATIONS)}
                { isItemSelected(pathName, MENU_ITEMS.APPLICATIONS) }
              </MenuItem>
            </div>
            <MenuItem
              icon={<Img src={activeStatus( "img_file.svg", pathName, MENU_ITEMS.LICENSES)}
                         alt="Licenses" className="h-[44px] w-[44px]" />}
              className={checkPermission('CAN_VIEW_LICENSES')}
              href={'/app/licenses'}>
              {activeSelection("Licenses", pathName, MENU_ITEMS.LICENSES)}
              { isItemSelected(pathName, MENU_ITEMS.LICENSES) }
            </MenuItem>
            <MenuItem icon={<Img src={activeStatus( "img_report.svg", pathName, MENU_ITEMS.REPORT)}
                                 alt="Reports" className="h-[40px] w-[40px]" />}
                      className={checkPermission('CAN_VIEW_REPORTS')}
                      href={'/app/reports'}>
              {activeSelection("Reports", pathName, MENU_ITEMS.REPORT)}
              { isItemSelected(pathName, MENU_ITEMS.REPORT) }
            </MenuItem>
            <MenuItem icon={<Img src={activeStatus( "img_user.svg", pathName, MENU_ITEMS.USERS)}
                                 alt="User" className="h-[44px] w-[44px]" />}
                      className={checkPermission('CAN_VIEW_USERS')}
                      href={'/app/users'}>
              {activeSelection("Users", pathName, MENU_ITEMS.USERS)}
              { isItemSelected(pathName, MENU_ITEMS.USERS) }
            </MenuItem>
            {/*<MenuItem icon={<Img src={activeStatus( "img_settings.svg", pathName, MENU_ITEMS.SETTINGS)}*/}
            {/*                     alt="Search" className="h-[40px] w-[40px] hidden" />}*/}
            {/*          href={'/app/settings'}>*/}
            {/*  {activeSelection("Settings", pathName, MENU_ITEMS.SETTINGS)}*/}
            {/*  { isItemSelected(pathName, MENU_ITEMS.SETTINGS) }*/}
            {/*</MenuItem>*/}
           {/*<MenuItem></MenuItem>*/}
            {/*<MenuItem></MenuItem>*/}
          </div>
        </Menu>
      </div>
    </Sidebar>
  );
}
