import React from "react";
import { Outlet } from "react-router-dom";

// ==============================|| PUBLIC LAYOUT ||============================== //

const PublicLayout = () => (
    <>
        <Outlet />
    </>
);

export default PublicLayout;