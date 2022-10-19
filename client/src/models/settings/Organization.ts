/**
 * model Organization
 */

export interface ISettingsOrganization {
  INN: number;
  name: string;
  phone: string;
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
  phone: "",
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
  phone: string;
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
  phone: "",
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
  "Адрес организации",
  "Email",
  "Действия",
];

export const initialBodyTableOrganization = [
  {
    id: "#",
    INN: 1111111111,
    name: "Название организации",
    phone: "(911) 111 1111",
    address: "Адрес организации",
    email: "exampl@mail.com",
    type: "organization",
  },
];

export const dataConversionOrganization = (list: ISettingsOrganization[]) => {
  return list.map((record) => {
    return {
      id: record._id,
      INN: record.INN,
      name: record.name,
      phone: record.phone,
      address: record.address,
      email: record.email,
      type: "organization",
    };
  });
};
