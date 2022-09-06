import axios from "axios";
import { IUser } from "../models/User";

//авторизация/регистрация
export const signIn = (formData: IUser) =>
  axios.post("/api/auth/login", formData);
export const signUp = (formData: IUser) =>
  axios.post("/api/auth/register", formData);

//записи из таблицы
export const allRecords = (token: string) =>
  axios.get("/api/records/", {
    headers: { Authorization: `Bearer ${token}` },
  });
