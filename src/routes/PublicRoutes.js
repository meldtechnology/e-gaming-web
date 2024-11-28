import React from "react";
import PublicLayout from "../layout/PublicLayout";
import { Home } from "../pages/public/Home";
import { SignIn } from "../pages/public/SignIn";
import { SignOut } from "../pages/public/SignOut";
import { LoginRedirect } from "../pages/public/Auth/LoginRedirect";
import { ProcessLogin } from "../pages/public/Auth/ProcessLogin";
import { ProfileAccount } from "../pages/public/Auth/ProfileAccount";
import { EmailVerify } from "../pages/public/EmailVerify";
import { General } from "../pages/public/Application";

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
        },
        {
            path: '/logout',
            element: <SignOut />
        },
        {
            path: '/complete/login',
            element: <ProfileAccount />
        },
        {
            path: '/verify/email/otp',
            element: <EmailVerify />
        },
        {
            path: '/apply',
            element: <General />
        },
    ]
}

export default PublicRoutes;