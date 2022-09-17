import axios from "axios";
import { IRecord } from "../models/Record";
import { ISettingsDestination, ISettingsProduct } from "../models/Settings";
import { IUser } from "../models/User";

//авторизация/регистрация
export const signIn = (formData: IUser) =>
  axios.post("/api/auth/login", formData);
export const signUp = (formData: IUser) =>
  axios.post("/api/auth/register", formData);

//запросы на записи для таблицы
export const allRecords = (token: string) =>
  axios.get("/api/records/", {
    headers: { Authorization: `Bearer ${token}` },
  });

export const newRecord = (record: {}, token: string) =>
  axios.post("/api/records/create", record, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const deleteRecord = (id: string, token: string) =>
  axios.delete("/api/records/delete", {
    headers: { Authorization: `Bearer ${token}` },
    data: { id },
  });

export const updateRecord = (record: IRecord, token: string) =>
  axios.put("/api/records/update", record, {
    headers: { Authorization: `Bearer ${token}` },
  });
//запросы на добавление пунктов отправления-назначения(раздел настройки)
export const allDestinations = (token: string) =>
  axios.get("/api/settings/destination/", {
    headers: { Authorization: `Bearer ${token}` },
  });
export const newDestination = (record: {}, token: string) =>
  axios.post("/api/settings/destination/create", record, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const deleteDestination = (id: string, token: string) =>
  axios.delete("/api/settings/destination/delete", {
    headers: { Authorization: `Bearer ${token}` },
    data: { id },
  });

export const updateDestination = (
  record: ISettingsDestination,
  token: string
) =>
  axios.put("/api/settings/destination/update", record, {
    headers: { Authorization: `Bearer ${token}` },
  });
//запросы на добавление списка товаров(раздел настройки)
export const allProducts = (token: string) =>
  axios.get("/api/settings/product", {
    headers: { Authorization: `Bearer ${token}` },
  });
export const newProduct = (record: {}, token: string) =>
  axios.post("/api/settings/product/create", record, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const deleteProduct = (id: string, token: string) =>
  axios.delete("/api/settings/product/delete", {
    headers: { Authorization: `Bearer ${token}` },
    data: { id },
  });
export const updateProduct = (record: ISettingsProduct, token: string) =>
  axios.put("/api/settings/product/update", record, {
    headers: { Authorization: `Bearer ${token}` },
  });
