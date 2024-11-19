import React from "react";
import PublicLayout from "../layout/PublicLayout";
import { Home } from "../pages/public/Home";
import { SignIn } from "../pages/public/SignIn";
import { SignOut } from "../pages/public/SignOut";
import { LoginRedirect } from "../pages/public/Auth/LoginRedirect";
import { ProcessLogin } from "../pages/public/Auth/ProcessLogin";

const PublicRoutes = {
    path: '/',
    element: <PublicLayout />,

    children: [
        {
            path: '/',
            element: <Home />
        },
        {
            path: '/sign-in',
            element: <SignIn />
        },
        {
            path: '/auth/login',
            element: <LoginRedirect />
        },
        {
            path: '/process/auth/login',
            element: <ProcessLogin />
        },{
            path: '/logout',
            element: <SignOut />
        },
    ]
}

export default PublicRoutes;