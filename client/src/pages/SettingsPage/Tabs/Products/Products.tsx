import React, { useState } from "react";
import { FormAddProduct } from "../../../../components/Form/FormsForAddRecords/FormAddProduct";
import TableSettings from "../../../../components/Tables/TableSettings/TableSettings";
import { useAppDispatch } from "../../../../redux/store";

export default function Products() {
  const cellNames = ["#", "Товар", "Единица измерения", "Действия"];
  const list = [
    { id: "1111", product: "Доска", unit: "м3", type: "products" },
    { id: "22222", product: "Бревна Березовые", unit: "м3", type: "products" },
    { id: "3333", product: "Пиловочник хвойный", unit: "м3", type: "products" },
  ];

  // const [list, setList] = useState([
  //   {
  //     id: "",
  //   },
  // ]);
  const dispatch = useAppDispatch();

  return (
    <>
      <FormAddProduct />
      <TableSettings nameThead={cellNames} data={list} />
    </>
  );
}
