import axios, { AxiosError } from "axios";
// import config from "../../../config/default.json";
import { IStatusUser } from "../redux/features/authSlice";
import { IStoreListRecords } from "../redux/features/recordSlice";
import { IStoreSettings } from "../redux/features/settingsSlice";

export const Api = axios.create({
  // baseURL: config.baseUrl + "/api/",
  baseURL: "/api/",
  headers: {
      Accept: 'application/json',
  },
});

interface IApp {
  auth: IStatusUser;
  records: IStoreListRecords;
  settings: IStoreSettings;
}

Api.interceptors.request.use(
  config => {
      const app: IApp =  JSON.parse(localStorage.getItem('AppLogistics') || "{}");
      const token = app?.auth.statusUser.user.token;
      if (token) {
        config.headers = config.headers ?? {};
        config.headers.Authorization = `Bearer ${token}`;
      }

      return config;
  },
  error => {
    Promise.reject(error.response || error.message);
  }
);

Api.interceptors.response.use(
  response => {
      return response;
  },
  async error => {
      const app: IApp =  JSON.parse(localStorage.getItem('AppLogistics') || "{}");
      const originalRequest = error.config;
      const refreshToken = app?.auth.statusUser.user.refreshToken;

      if (
          refreshToken &&
          error.response.status === 401 &&
          !originalRequest._retry
      ) {
          originalRequest._retry = true;

          try {
            const rs = await getRefreshToken(refreshToken);
            const { token } = rs.data;
            app.auth.statusUser.user.token = token;
            localStorage.setItem('AppLogistics', JSON.stringify(app));

            Api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

            return Api(originalRequest);
          } catch (_error) {

            if ((_error as AxiosError).response && (_error as AxiosError).response?.data) {
              return Promise.reject((_error as AxiosError).response?.data);
            }

            return Promise.reject(_error);
          }
      }

      return Promise.reject((error as AxiosError).response?.data);

      // return Promise.reject(error.response || error.message);
  }
);

async function getRefreshToken(refreshToken: string) {
  return Api.post("/auth/refreshtoken", {
    refreshToken: refreshToken,
  });
}
