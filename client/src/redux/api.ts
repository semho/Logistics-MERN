import axios from "axios";
import { IRecord } from "../models/Record";
import { ISettingsForwarder } from "../models/settings/Forwarder";
import { ISettingsOrganization } from "../models/settings/Organization";
import { ISettingsProduct } from "../models/settings/Product";
import { IUser } from "../models/User";
import { Api } from "../service/interceptors";

//авторизация/регистрация
export const signIn = (formData: IUser) =>
  axios.post("/api/auth/login", formData);
export const signUp = (formData: IUser) =>
  axios.post("/api/auth/register", formData);
//запросы на записи для таблицы
export const allRecords = (token: string) =>
  Api.get("/records/", {
    headers: { Authorization: `Bearer ${token}` },
  });
export const newRecord = (record: {}, token: string) =>
  Api.post("/records/create", record, {
    headers: { Authorization: `Bearer ${token}` },
  });
export const deleteRecord = (id: string, token: string) =>
  Api.delete("/records/delete", {
    headers: { Authorization: `Bearer ${token}` },
    data: { id },
  });
export const updateRecord = (record: IRecord, token: string) =>
  Api.put("/records/update", record, {
    headers: { Authorization: `Bearer ${token}` },
  });
//запросы на добавление списка товаров(раздел настройки)
export const allApiProducts = (token: string) =>
  Api.get("/settings/product", {
    headers: { Authorization: `Bearer ${token}` },
  });
export const newApiProduct = (record: {}, token: string) =>
  Api.post("/settings/product/create", record, {
    headers: { Authorization: `Bearer ${token}` },
  });
export const deleteApiProduct = (id: string, token: string) =>
  Api.delete("/settings/product/delete", {
    headers: { Authorization: `Bearer ${token}` },
    data: { id },
  });
export const updateApiProduct = (record: ISettingsProduct, token: string) =>
  Api.put("/settings/product/update", record, {
    headers: { Authorization: `Bearer ${token}` },
  });
//запросы на добавление ответственного(раздел настройки)
export const allApiForwarders = (token: string) =>
  Api.get("/settings/forwarder", {
    headers: { Authorization: `Bearer ${token}` },
  });
export const newApiForwarder = (record: {}, token: string) =>
  Api.post("/settings/forwarder/create", record, {
    headers: { Authorization: `Bearer ${token}` },
  });
export const deleteApiForwarder = (id: string, token: string) =>
  Api.delete("/settings/forwarder/delete", {
    headers: { Authorization: `Bearer ${token}` },
    data: { id },
  });
export const updateApiForwarder = (record: ISettingsForwarder, token: string) =>
  Api.put("/settings/forwarder/update", record, {
    headers: { Authorization: `Bearer ${token}` },
  });
//запросы на добавление организации(раздел настройки)
export const AllApiOrganizations = (token: string) =>
  Api.get("/settings/organization", {
    headers: { Authorization: `Bearer ${token}` },
  });
export const newApiOrganization = (record: {}, token: string) =>
  Api.post("/settings/organization/create", record, {
    headers: { Authorization: `Bearer ${token}` },
  });
export const deleteApiOrganization = (id: string, token: string) =>
  Api.delete("/settings/organization/delete", {
    headers: { Authorization: `Bearer ${token}` },
    data: { id },
  });
export const updateApiOrganization = (
  record: ISettingsOrganization,
  token: string
) =>
  Api.put("/settings/organization/update", record, {
    headers: { Authorization: `Bearer ${token}` },
  });
//запросы для статистики и аналитики
//запросы вне redux
//получить статистику сумм по органиции, которая отправляет товар
export const getSumShipProduct = async (id: string, token: string) => {
  return await Api.get(`/statistics/ship-product/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
//получить статистику сумм по органиции, которая получает товар
export const getSumArrivalProduct = async (id: string, token: string) => {
  return await Api.get(`/statistics/arrival-product/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
//маскимальная цена товара
export const maxPrice = async (token: string) =>
  Api.get("/statistics/max-price", {
    headers: { Authorization: `Bearer ${token}` },
  });
//минимальная цена товара
export const minPrice = async (token: string) =>
  Api.get("/statistics/min-price", {
    headers: { Authorization: `Bearer ${token}` },
  });
//получаем товары для сводки
export const shipArrivalProductsOrg = (record: {}, token: string) =>
  Api.post("/statistics/ship-arrival-products", record, {
    headers: { Authorization: `Bearer ${token}` },
  });
//получаем товары для сводки в диапазоне дат
export const shipArrivalProductsDateInterval = (record: {}, token: string) =>
  Api.post("/statistics/ship-arrival-products-interval", record, {
    headers: { Authorization: `Bearer ${token}` },
  });
