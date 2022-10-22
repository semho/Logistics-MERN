import { formatDate } from "../utils/formatDate";

export interface IRecord {
  date: string;
  dateUpdate: string;
  distance: number;
  forwarder_id: string;
  fromOrganization_id: string;
  toOrganization_id: string;
  owner: string;
  price: number;
  product_id: string;
  sum: number;
  units: number;
  __v: number;
  _id: string;
}

export const initialEmptyState: IRecord = {
  fromOrganization_id: "",
  toOrganization_id: "",
  distance: Number(),
  forwarder_id: "",
  owner: "",
  price: Number(),
  product_id: "",
  units: Number(),
  date: "",
  dateUpdate: "",
  sum: Number(),
  __v: Number(),
  _id: "",
};

export type TRecord = {
  distance: number;
  forwarder_id: string;
  fromOrganization_id: string;
  toOrganization_id: string;
  owner: string;
  price: number;
  product_id: string;
  units: number;
};

export interface IListRecords extends Array<IRecord> {}

export const namesTableRecord = [
  "#",
  "Дата создания",
  "Дата обновления",
  "Откуда-Куда",
  "Расстояние, км",
  "Товар",
  "Количество, м3",
  "Ответственный",
  "Стоимость единицы, руб",
  "Сумма товара, руб",
  "Действия",
];

export const dataConversionRecord = (list: IListRecords) => {
  return list.map((record) => {
    return {
      id: record._id,
      date: formatDate(record.date),
      dateUpdate: formatDate(record.dateUpdate),
      fromTo: `${record.fromOrganization_id} | ${record.toOrganization_id}`,
      distance: record.distance,
      product: record.product_id,
      units: record.units,
      forwarder: record.forwarder_id,
      price: record.price,
      sum: record.sum,
      type: "record",
    };
  });
};
