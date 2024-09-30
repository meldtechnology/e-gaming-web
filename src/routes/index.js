import { useRoutes } from "react-router-dom";

//Routes
import ProtectedRoutes from "./ProtectedRoutes";
import PublicRoutes from "./PublicRoutes";
import UnavailableRoutes from "./UnavailableRoutes";

export default function AppRoutes() {
    return useRoutes([PublicRoutes, ProtectedRoutes, UnavailableRoutes]);
}