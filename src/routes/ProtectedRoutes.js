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
        {
            path: 'documents',
            element: <AppLayout />
        },
        {
            path: 'documents/T_46042b50',
            element: <AppLayout />
        },
        {
            path: 'documents/F_322f9837',
            element: <AppLayout />
        },
    ]
};

export default ProtectedRoutes;