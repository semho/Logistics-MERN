import React from "react";
import { FormAddProduct } from "../../../../components/FormAddProduct";
import TableSettings from "../../../../components/Tables/ForSettings/TableSettings";

export default function Products() {
  const cellNames = ["#", "Товар", "Действия"];
  const list = [
    { id: "1111", product: "Доска" },
    { id: "22222", product: "Бревна Березовые" },
    { id: "3333", product: "Пиловочник хвойный" },
  ];
  return (
    <>
      <div className="lg:flex pt-5 justify-center">
        <FormAddProduct />
      </div>
      <TableSettings nameThead={cellNames} data={list} />
    </>
  );
}
