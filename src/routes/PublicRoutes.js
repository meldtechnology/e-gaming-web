import React from "react";
import PublicLayout from "../layout/PublicLayout";
import {Home} from "../pages/Home";
import Login from "pages/Home/login";

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
            element: <Login />
        }
    ]
}

export default PublicRoutes;