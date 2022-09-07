import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import AuthReducer from "./features/authSlice";
import RecordReducer from "./features/recordSlice";

//NOTE: собираем localStorage для помещения данных в Middleware
const localStorageMiddleware = ({ getState }: any) => {
  return (next: any) => (action: any) => {
    const result = next(action);
    localStorage.setItem("AppLogistics", JSON.stringify(getState()));
    return result;
  };
};
//тут извлекаем из localStore
const reHydrateStore = () => {
  if (localStorage.getItem("AppLogistics") !== null) {
    return JSON.parse(localStorage.getItem("AppLogistics") || "{}"); // re-hydrate the store
  }
};

const store = configureStore({
  reducer: {
    auth: AuthReducer,
    records: RecordReducer,
  },
  preloadedState: reHydrateStore(),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(localStorageMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
