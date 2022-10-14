/**
 * model Organization
 */

export interface ISettingsOrganization {
  INN: number;
  name: string;
  phone: number;
  address: string;
  email: string;
  bank: string;
  KPP: string;
  OGRN: string;
  paymentAccount: string;
  corAccount: string;
  BIC: string;
  coordinates: string;
  owner: "";
  __v: number;
  _id: string;
}

export const initialSettingsOrganization: ISettingsOrganization = {
  INN: Number(),
  name: "",
  phone: Number(),
  address: "",
  email: "",
  bank: "",
  KPP: "",
  OGRN: "",
  paymentAccount: "",
  corAccount: "",
  BIC: "",
  coordinates: "",
  owner: "",
  __v: Number(),
  _id: "",
};

export interface ISettingsOrganizationShort {
  INN: number;
  name: string;
  phone: number;
  address: string;
  email: string;
  bank: string;
  KPP: string;
  OGRN: string;
  paymentAccount: string;
  corAccount: string;
  BIC: string;
  coordinates: string;
}

export const initialSettingsOrganizationShort: ISettingsOrganizationShort = {
  INN: Number(),
  name: "",
  phone: Number(),
  address: "",
  email: "",
  bank: "",
  KPP: "",
  OGRN: "",
  paymentAccount: "",
  corAccount: "",
  BIC: "",
  coordinates: "",
};

export interface IListSettingOrganization
  extends Array<ISettingsOrganization> {}

export const namesTableOrganization = [
  "#",
  "ИНН",
  "Название организации",
  "Номер телефона",
  "Действия",
  "Адрес организации",
  "Email",
  "Банк",
  "КПП",
  "ОГРН",
  "Расчетный счет",
  "Кор.счет",
  "БИК",
  "Координаты",
];

export const initialBodyTableOrganization = [
  {
    id: "#",
    INN: 1111111111,
    name: "Название организации",
    phone: 1234567890,
    address: "Адрес организации",
    email: "exampl@mail.com",
    bank: "Банк",
    KPP: "111111111",
    OGRN: "1111111111111",
    paymentAccount: "11111111111111111111",
    corAccount: "11111111111111111111",
    BIC: "111111111",
    coordinates: "11.1 11.1",
    type: "organization",
  },
];
