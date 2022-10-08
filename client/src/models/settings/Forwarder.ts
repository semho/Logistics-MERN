/**
 * model Forwarder
 */

export interface ISettingsForwarder {
  forwarder: string;
  birth: string;
  carNumber: string;
  carBrand: string;
  owner: "";
  __v: number;
  _id: string;
}

export const initialSettingsForwarder: ISettingsForwarder = {
  forwarder: "",
  birth: "",
  carNumber: "",
  carBrand: "",
  owner: "",
  __v: Number(),
  _id: "",
};

export interface ISettingsForwarderShort {
  forwarder: string;
  birth: string;
  carNumber: string;
  carBrand: string;
}

export const initialSettingsForwarderShort: ISettingsForwarderShort = {
  forwarder: "",
  birth: "",
  carNumber: "",
  carBrand: "",
};

export interface IListSettingsForwarder extends Array<ISettingsForwarder> {}

export const namesTableForwarder = [
  "#",
  "Ответственный",
  "Дата Рождения",
  "Гос. номер",
  "Марка машины",
  "Действия",
];

export const initialBodyTableForwarder = [
  {
    id: "#",
    forwarder: "Ответственный",
    birth: "Дата рождения",
    carNumber: "Гос.номер",
    carBrand: "Марка машины",
    type: "forwarder",
  },
];

export const dataConversionForwarder = (list: ISettingsForwarder[]) => {
  return list.map((record) => {
    return {
      id: record._id,
      forwarder: record.forwarder,
      birth: record.birth,
      carNumber: record.carNumber,
      carBrand: record.carBrand,
      type: "forwarder",
    };
  });
};
