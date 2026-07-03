import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  HomeIcon,
  DocumentTextIcon,
  ClipboardDocumentCheckIcon,
  IdentificationIcon,
  ChartBarIcon,
  UsersIcon,
  ArrowRightStartOnRectangleIcon,
} from "@heroicons/react/24/outline";
import { getItem } from "../../services";
import { checkPermission } from "../../services/autorization";

const NAV_ITEMS = [
  { label: "Dashboard", to: "/app/dashboard", icon: HomeIcon, permission: "CAN_VIEW_DASHBOARD" },
  { label: "Documents", to: "/app/documents", icon: DocumentTextIcon, permission: "CAN_VIEW_DOCUMENTS" },
  { label: "Applications", to: "/app/applications", icon: ClipboardDocumentCheckIcon, permission: "CAN_VIEW_APPLICATIONS" },
  { label: "Licenses", to: "/app/licenses", icon: IdentificationIcon, permission: "CAN_VIEW_LICENSES" },
  { label: "Reports", to: "/app/reports", icon: ChartBarIcon, permission: "CAN_VIEW_REPORTS" },
  { label: "Users", to: "/app/users", icon: UsersIcon, permission: "CAN_VIEW_USERS" },
];

const truncate = (value, max = 18) => (value && value.length > max ? `${value.slice(0, max)}…` : value);

export const LeftSidebar = ({ ...props }) => {
  const location = useLocation();
  const [user, setUser] = useState({});
  const canViewProfile = checkPermission("CAN_VIEW_PROFILE");

  useEffect(() => {
    try {
      setUser(JSON.parse(getItem("profile")) ?? {});
    } catch {
      setUser({});
    }
  }, []);

  const isActive = (to) => location.pathname === to || location.pathname.startsWith(`${to}/`);
  const profile = user?.profile ?? {};
  const fullName = `${profile.firstName ?? ""} ${profile.lastName ?? ""}`.trim();

  return (
    <aside
      {...props}
      className={`sticky top-0 z-30 flex h-screen w-[264px] shrink-0 flex-col bg-sidebar text-sidebar-text md:w-[76px] ${props.className ?? ""}`}
    >
      {/* Brand */}
      <div className="flex items-center gap-3 px-5 py-5 md:justify-center md:px-2">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-white/10 ring-1 ring-white/10">
          <img src="/images/enugu_logo2.png" alt="ESGC" className="h-7 w-7 object-contain" />
        </span>
        <div className="md:hidden">
          <p className="text-sm font-bold leading-tight text-white">ESGC</p>
          <p className="text-[11px] leading-tight text-sidebar-text/70">Gaming Commission</p>
        </div>
      </div>

      {/* Profile */}
      {canViewProfile && fullName ? (
        <div className="mx-3 mb-2 flex items-center gap-3 rounded-xl bg-sidebar-muted px-3 py-2.5 md:mx-2 md:justify-center md:px-2">
          <img
            src={profile.profilePicture || "/images/enugu_logo2.png"}
            alt="Profile"
            className="h-9 w-9 shrink-0 rounded-full object-cover ring-1 ring-white/10"
          />
          <div className="min-w-0 flex-1 md:hidden">
            <Link to="/app/users/profile" className="block truncate text-sm font-semibold text-white hover:text-brand-200">
              {truncate(fullName)}
            </Link>
            <p className="truncate text-[11px] text-sidebar-text/70">{truncate(profile?.settings?.role ?? "", 20)}</p>
          </div>
          <Link to="/logout" aria-label="Sign out" className="text-sidebar-text/70 transition-colors hover:text-white md:hidden">
            <ArrowRightStartOnRectangleIcon className="h-5 w-5" />
          </Link>
        </div>
      ) : null}

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-3 py-2 md:px-2" aria-label="Primary">
        <ul className="flex flex-col gap-1">
          {NAV_ITEMS.filter((item) => checkPermission(item.permission)).map((item) => {
            const active = isActive(item.to);
            const Icon = item.icon;
            return (
              <li key={item.to}>
                <Link
                  to={item.to}
                  aria-current={active ? "page" : undefined}
                  title={item.label}
                  className={`group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors md:justify-center md:px-2 ${
                    active
                      ? "bg-brand text-white shadow-e1"
                      : "text-sidebar-text hover:bg-sidebar-muted hover:text-white"
                  }`}
                >
                  <Icon className="h-5 w-5 shrink-0" />
                  <span className="md:hidden">{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer logout */}
      <div className="border-t border-white/10 px-3 py-3 md:px-2">
        <Link
          to="/logout"
          className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-sidebar-text transition-colors hover:bg-sidebar-muted hover:text-white md:justify-center md:px-2"
          title="Sign out"
        >
          <ArrowRightStartOnRectangleIcon className="h-5 w-5 shrink-0" />
          <span className="md:hidden">Sign out</span>
        </Link>
      </div>
    </aside>
  );
};
