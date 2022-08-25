import "./App.css";
import "../main.global.css";
import React from "react";
import { Layout } from "../Layout";
import { hot } from "react-hot-loader/root";
import { setConfig } from "react-hot-loader";
import { useRoutes } from "../routes";
import { BrowserRouter } from "react-router-dom";

setConfig({
  showReactDomPatchNotification: false,
});

const App = () => {
  const routes = useRoutes(false);
  return (
    <BrowserRouter>
      <Layout>{routes}</Layout>
    </BrowserRouter>
  );
};

export default process.env.NODE_ENV === "development" ? hot(App) : App;
