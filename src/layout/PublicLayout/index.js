import React from "react";
import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles";
import { Outlet } from "react-router-dom";
import getTheme from "../../mui/theme";

// ==============================|| PUBLIC LAYOUT ||============================== //

const publicLightTheme = getTheme("light", () => {});

const PublicLayout = () => (
    <MuiThemeProvider theme={publicLightTheme}>
        <div className="theme-light" data-theme="light">
            <Outlet />
        </div>
    </MuiThemeProvider>
);

export default PublicLayout;
