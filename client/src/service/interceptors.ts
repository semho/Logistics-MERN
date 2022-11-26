import { AnyAction, EnhancedStore, MiddlewareArray } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { toast } from "react-toastify";
import { ThunkMiddleware } from "redux-thunk";
import {
  IStatusUser,
  removeUser,
  replaceToken,
} from "../redux/features/authSlice";
import { IStoreListRecords } from "../redux/features/recordSlice";
import { IStoreSettings } from "../redux/features/settingsSlice";

export const Api = axios.create({
  baseURL: "/api/",
  headers: {
    Accept: "application/json",
  },
});

interface IApp {
  auth: IStatusUser;
  records: IStoreListRecords;
  settings: IStoreSettings;
}

export const setup = (
  store: EnhancedStore<
    IApp,
    AnyAction,
    MiddlewareArray<
      [
        ThunkMiddleware<IApp, AnyAction, undefined>,
        ({ getState }: any) => (next: any) => (action: any) => any
      ]
    >
  >
) => {
  Api.interceptors.request.use(
    (config) => {
      //достаем из redux
      const token = store.getState().auth.statusUser.user.token;
      if (token) {
        config.headers = config.headers ?? {};
        config.headers.Authorization = `Bearer ${token}`;
      }

      return config;
    },
    (error) => {
      Promise.reject(error.response || error.message);
    }
  );
  const { dispatch } = store;
  Api.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error) => {
      const originalRequest = error.config;
      //достаем из redux
      const refreshToken = store.getState().auth.statusUser.user.refreshToken;
      if (
        refreshToken &&
        error.response.status === 401 &&
        !originalRequest._retry
      ) {
        originalRequest._retry = true;

        try {
          const rs = await getRefreshToken(refreshToken);
          const { token } = rs.data;
          //перезаписать токен в сторе
          dispatch(replaceToken(token));

          Api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

          return Api(originalRequest);
        } catch (_error) {
          if (
            (_error as AxiosError).response &&
            (_error as AxiosError).response?.data
          ) {
            return Promise.reject((_error as AxiosError).response?.data);
          }

          return Promise.reject(_error);
        }
      }

      if (error.response.status === 403 && error.response.data) {
        dispatch(removeUser(""));
        toast.error(error.response.data.message, {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }

      return Promise.reject((error as AxiosError).response?.data);
    }
  );
};

async function getRefreshToken(refreshToken: string) {
  return Api.post("/auth/refreshtoken", {
    refreshToken: refreshToken,
  });
}
