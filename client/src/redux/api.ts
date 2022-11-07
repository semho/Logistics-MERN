import axios from "axios";
import { IRecord } from "../models/Record";
import { ISettingsForwarder } from "../models/settings/Forwarder";
import { ISettingsOrganization } from "../models/settings/Organization";
import { ISettingsProduct } from "../models/settings/Product";
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
//запросы на добавление списка товаров(раздел настройки)
export const allApiProducts = (token: string) =>
  axios.get("/api/settings/product", {
    headers: { Authorization: `Bearer ${token}` },
  });
export const newApiProduct = (record: {}, token: string) =>
  axios.post("/api/settings/product/create", record, {
    headers: { Authorization: `Bearer ${token}` },
  });
export const deleteApiProduct = (id: string, token: string) =>
  axios.delete("/api/settings/product/delete", {
    headers: { Authorization: `Bearer ${token}` },
    data: { id },
  });
export const updateApiProduct = (record: ISettingsProduct, token: string) =>
  axios.put("/api/settings/product/update", record, {
    headers: { Authorization: `Bearer ${token}` },
  });
//запросы на добавление ответственного(раздел настройки)
export const allApiForwarders = (token: string) =>
  axios.get("/api/settings/forwarder", {
    headers: { Authorization: `Bearer ${token}` },
  });
export const newApiForwarder = (record: {}, token: string) =>
  axios.post("/api/settings/forwarder/create", record, {
    headers: { Authorization: `Bearer ${token}` },
  });
export const deleteApiForwarder = (id: string, token: string) =>
  axios.delete("/api/settings/forwarder/delete", {
    headers: { Authorization: `Bearer ${token}` },
    data: { id },
  });
export const updateApiForwarder = (record: ISettingsForwarder, token: string) =>
  axios.put("/api/settings/forwarder/update", record, {
    headers: { Authorization: `Bearer ${token}` },
  });
//запросы на добавление организации(раздел настройки)
export const AllApiOrganizations = (token: string) =>
  axios.get("/api/settings/organization", {
    headers: { Authorization: `Bearer ${token}` },
  });
export const newApiOrganization = (record: {}, token: string) =>
  axios.post("/api/settings/organization/create", record, {
    headers: { Authorization: `Bearer ${token}` },
  });
export const deleteApiOrganization = (id: string, token: string) =>
  axios.delete("/api/settings/organization/delete", {
    headers: { Authorization: `Bearer ${token}` },
    data: { id },
  });
export const updateApiOrganization = (
  record: ISettingsOrganization,
  token: string
) =>
  axios.put("/api/settings/organization/update", record, {
    headers: { Authorization: `Bearer ${token}` },
  });
//запросы для статистики и аналитики
//запросы вне redux
//получить статистику сумм по органиции, которая отправляет товар
export const getSumShipProduct = async (id: string, token: string) => {
  return await axios.get(`/api/statistics/ship-product/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
//получить статистику сумм по органиции, которая получает товар
export const getSumArrivalProduct = async (id: string, token: string) => {
  return await axios.get(`/api/statistics/arrival-product/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
//маскимальная цена товара
export const maxPrice = async (token: string) =>
  axios.get("/api/statistics/max-price", {
    headers: { Authorization: `Bearer ${token}` },
  });
//минимальная цена товара
export const minPrice = async (token: string) =>
  axios.get("/api/statistics/min-price", {
    headers: { Authorization: `Bearer ${token}` },
  });
export const shipArrivalProductsOrg = (record: {}, token: string) =>
  axios.post("/api/statistics/ship-arrival-products", record, {
    headers: { Authorization: `Bearer ${token}` },
  });
