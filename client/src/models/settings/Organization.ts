/**
 * model Organization
 */

export interface ISettingsOrganization {
  INN: number;
  name: string;
  phone: number;
  address: string;
  email: string;
  KPP: number;
  OGRN: number;
  paymentAccount: number;
  corsets: number;
  BIC: number;
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
  KPP: Number(),
  OGRN: Number(),
  paymentAccount: Number(),
  corsets: Number(),
  BIC: Number(),
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
  KPP: number;
  OGRN: number;
  paymentAccount: number;
  corsets: number;
  BIC: number;
  coordinates: string;
}

export const initialSettingsOrganizationShort: ISettingsOrganizationShort = {
  INN: Number(),
  name: "",
  phone: Number(),
  address: "",
  email: "",
  KPP: Number(),
  OGRN: Number(),
  paymentAccount: Number(),
  corsets: Number(),
  BIC: Number(),
  coordinates: "",
};

export interface IListSettingOrganization
  extends Array<ISettingsOrganization> {}
