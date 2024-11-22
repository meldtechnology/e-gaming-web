import React from "react";
import Routes from './routes';
import {BrowserRouter} from "react-router-dom";
import Page from "./mui/components/Page";

function App() {
  return (
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
  );
}

export default App;
