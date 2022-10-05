import "./App.css";
import "../assets/css/main.global.css";
import "react-toastify/dist/ReactToastify.css";
import React from "react";
import { Layout } from "../Layout";
import { hot } from "react-hot-loader/root";
import { setConfig } from "react-hot-loader";
import { useRoutes } from "../routes/routes";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useToken } from "../hooks/useToken";

setConfig({
  showReactDomPatchNotification: false,
});

const App = () => {
  const token = useToken();
  const isAuth = !!token;
  const routes = useRoutes(isAuth);
  return (
    <BrowserRouter>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <Layout>{routes}</Layout>
    </BrowserRouter>
  );
};

export default process.env.NODE_ENV === "development" ? hot(App) : App;
