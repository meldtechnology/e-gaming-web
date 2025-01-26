import React from "react";
import PublicLayout from "../layout/PublicLayout";
import { Home } from "../pages/public/Home";
import { SignIn } from "../pages/public/SignIn";
import { SignOut } from "../pages/public/SignOut";
import { LoginRedirect } from "../pages/public/Auth/LoginRedirect";
import { ProcessLogin } from "../pages/public/Auth/ProcessLogin";
import { ProfileAccount } from "../pages/public/Auth/ProfileAccount";
import { EmailVerify } from "../pages/public/EmailVerify";
import { General, Operators, Verification } from "../pages/public/Application";
import { Form } from "../pages/public/Application/Form";
import { Invoice } from "../pages/public/Application/Invoice";
import { LoadAuthorities } from "../pages/public/Auth/LoadAuthorities";
import { LicenseDetails } from "../pages/Documents/License/LicenseDetails";

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
            path: '/authorizing/login',
            element: <LoadAuthorities />
        },
        {
            path: '/verify/email/otp',
            element: <EmailVerify />
        },
        {
            path: '/apply',
            element: <General />
        },
        {
            path: '/apply/operator/:operatorType',
            element: <Operators />
        },
        {
            path: '/documents/licenses/:number',
            element: <LicenseDetails />
        },
        {
            path: '/apply/operator/form',
            element: <Form />
        },
        {
            path: '/apply/operator/verification',
            element: <Verification />
        },
        {
            path: '/apply/payment/invoice',
            element: <Invoice />
        },
    ]
}

export default PublicRoutes;