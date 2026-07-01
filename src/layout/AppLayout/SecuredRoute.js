import { Navigate, Outlet, useLocation } from "react-router-dom";
import { getItem } from "../../services";
import { checkPermission } from "../../services/autorization";

export const SecuredRoute = () => {
    const location = useLocation();
    const token = getItem('at');

    if (!token) {
        return <Navigate to="/sign-in" replace state={{ from: location }} />;
    }

    return <Outlet />
}

export const PermissionRoute = ({ permission, children, redirectTo = "/app/dashboard" }) => {
    const permissions = Array.isArray(permission) ? permission : [permission];
    const authorized = permissions.some((item) => checkPermission(item));

    if (!authorized) {
        return <Navigate to={redirectTo} replace />;
    }

    return children;
}
