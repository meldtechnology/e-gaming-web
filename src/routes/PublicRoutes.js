import React from "react";
import PublicLayout from "../layout/PublicLayout";
import {Home} from "../pages/Home";

const PublicRoutes = {
    path: '/',
    element: <PublicLayout />,

    children: [
        {
            path: '/',
            element: <Home />
        }
    ]
}

export default PublicRoutes;