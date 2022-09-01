export interface IRecord {
  date: string;
  distance: number;
  forwarder: string;
  fromTo: string;
  owner: string;
  price: number;
  product: string;
  sum: number;
  units: number;
  __v: number;
  _id: string;
}

export const initialEmptyState: IRecord = {
  fromTo: "",
  distance: Number(),
  forwarder: "",
  owner: "",
  price: Number(),
  product: "",
  units: Number(),
  date: "",
  sum: Number(),
  __v: Number(),
  _id: "",
};

export type TRecord = {
  distance: number;
  forwarder: string;
  fromTo: string;
  owner: string;
  price: number;
  product: string;
  units: number;
};

export interface IListRecords extends Array<IRecord> {}
