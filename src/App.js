import React from "react";
import Routes from './routes';
import {BrowserRouter} from "react-router-dom";
import { AppThemeProvider } from "./theme/ThemeProvider";
import { AppErrorBoundary } from "./monitoring/AppErrorBoundary";

function App() {
  return (
    <AppErrorBoundary>
      <AppThemeProvider>
        <BrowserRouter>
          <Routes />
        </BrowserRouter>
      </AppThemeProvider>
    </AppErrorBoundary>
  );
}

export default App;
