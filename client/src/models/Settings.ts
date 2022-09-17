export interface ISettingsDestination {
  from: string;
  to: string;
  distance: number;
  sender: string;
  recipient: string;
  owner: string;
  __v: number;
  _id: string;
}
export const initialSettingsDestination: ISettingsDestination = {
  from: "",
  to: "",
  sender: "",
  recipient: "",
  distance: Number(),
  owner: "",
  __v: Number(),
  _id: "",
};

export interface ISettingsDestinationShort {
  from: string;
  to: string;
  distance: number;
  sender: string;
  recipient: string;
}

export const initialSettingsDestinationShort: ISettingsDestinationShort = {
  from: "",
  to: "",
  sender: "",
  recipient: "",
  distance: Number(),
};

export interface IListSettingDestination extends Array<ISettingsDestination> {}

export interface ISettingsProduct {
  product: string;
  unit: string;
  owner: "";
  __v: number;
  _id: string;
}

export const initialSettingsProduct: ISettingsProduct = {
  product: "",
  unit: "",
  owner: "",
  __v: Number(),
  _id: "",
};

export interface ISettingsProductShort {
  product: string;
  unit: string;
}

export const initialSettingsProductShort: ISettingsProductShort = {
  product: "",
  unit: "",
};

export interface IListSettingProduct extends Array<ISettingsProduct> {}

export interface ISettingsForwarder {
  forwarder: string;
  birth: string;
  number: string;
  carBrand: string;
  owner: "";
  __v: number;
  _id: string;
}

export const initialSettingsForwarder: ISettingsForwarder = {
  forwarder: "",
  birth: "",
  number: "",
  carBrand: "",
  owner: "",
  __v: Number(),
  _id: "",
};

export interface IListSettingsForwarder extends Array<ISettingsForwarder> {}
