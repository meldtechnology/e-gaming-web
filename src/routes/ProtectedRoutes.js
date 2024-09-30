import React from "react";
import {SecuredRoute} from "../layout/AppLayout/SecuredRoute";
import AppLayout from "../layout/AppLayout";

const ProtectedRoutes = {
    path: '/app',
    element: <SecuredRoute />,
    children: [
        {
            path: 'dashboard',
            element: <AppLayout />
        },
        {
            path: 'users',
            element: <AppLayout />
        },
        {
            path: 'users/profile',
            element: <AppLayout />
        },
        {
            path: 'users/_new',
            element: <AppLayout />
        },
        {
            path: 'users/_edit',
            element: <AppLayout />
        },
    ]
};

export default ProtectedRoutes;