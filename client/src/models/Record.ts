import { formatDate } from "../utils/formatDate";

export interface IRecord {
  date: string;
  dateUpdate: string;
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
  dateUpdate: "",
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
      fromTo: record.fromTo,
      distance: record.distance,
      product: record.product,
      units: record.units,
      forwarder: record.forwarder,
      price: record.price,
      sum: record.sum,
      type: "record",
    };
  });
};
