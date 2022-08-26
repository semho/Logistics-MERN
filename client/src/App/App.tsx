import "./App.css";
import "../main.global.css";
import "react-toastify/dist/ReactToastify.css";
import React from "react";
import { Layout } from "../Layout";
import { hot } from "react-hot-loader/root";
import { setConfig } from "react-hot-loader";
import { useRoutes } from "../routes";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useAuth } from "../hooks/useAuth";
import { AuthContext } from "../context/AuthContext";

setConfig({
  showReactDomPatchNotification: false,
});

const App = () => {
  const { token, login, logout, userId } = useAuth();
  const isAuth = !!token;
  const routes = useRoutes(isAuth);
  return (
    <AuthContext.Provider
      value={{
        token,
        userId,
        login,
        logout,
        isAuth,
      }}
    >
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
    </AuthContext.Provider>
  );
};

export default process.env.NODE_ENV === "development" ? hot(App) : App;
