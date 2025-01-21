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
        {
            path: 'documents/F_D5N2M19',
            element: <AppLayout />
        },
        {
            path: 'applications',
            element: <AppLayout />
        },
        {
            path: 'documents/R_SHFB95GH',
            element: <AppLayout />
        },
        {
            path: 'licenses',
            element: <AppLayout />
        },
        {
            path: 'licenses/L_10O9I78',
            element: <AppLayout />
        },
        {
            path: 'reports',
            element: <AppLayout />
        },
        {
            path: 'reports/R_1786100',
            element: <AppLayout />
        },
        {
            path: 'reports/R_1786101',
            element: <AppLayout />
        },
    ]
};

export default ProtectedRoutes;