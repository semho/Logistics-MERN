export interface ISettingsDestination {
  fromTo: string;
  distance: number;
  senderToRecipient: string;
  owner: string;
  __v: number;
  _id: string;
}

export const initialSettingsDestination: ISettingsDestination = {
  fromTo: "",
  distance: Number(),
  senderToRecipient: "",
  owner: "",
  __v: Number(),
  _id: "",
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
