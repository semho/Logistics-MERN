import React from "react";
import { FormAddProduct } from "../../../../components/FormAddProduct";
import TableSettings from "../../../../components/Tables/ForSettings/TableSettings";

export default function Products() {
  const cellNames = ["#", "Товар", "Единица измерения", "Действия"];
  const list = [
    { id: "1111", product: "Доска", unit: "м3" },
    { id: "22222", product: "Бревна Березовые", unit: "м3" },
    { id: "3333", product: "Пиловочник хвойный", unit: "м3" },
  ];
  return (
    <>
      <FormAddProduct />
      <TableSettings nameThead={cellNames} data={list} />
    </>
  );
}
