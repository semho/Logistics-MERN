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

export interface IListRecords extends Array<IRecord> {}
