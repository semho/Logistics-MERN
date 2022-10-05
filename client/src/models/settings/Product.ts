/**
 * model Product
 */

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

export const namesTableProduct = [
  "#",
  "Товар",
  "Единица измерения",
  "Действия",
];

export const initialBodyTableProduct = [
  {
    id: "#",
    product: "Товар",
    unit: "Единица измерения",
    type: "product",
  },
];

export const dataConversionProduct = (list: ISettingsProduct[]) => {
  return list.map((record) => {
    return {
      id: record._id,
      product: record.product,
      unit: record.unit,
      type: "product",
    };
  });
};
