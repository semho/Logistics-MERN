import React from "react";
import { FormAddForwarder } from "../../../../components/FormAddForwarder";
import TableSettings from "../../../../components/Tables/ForSettings/TableSettings";

export default function Forwarder() {
  const cellNames = [
    "#",
    "Ответственный",
    "Дата Рождения",
    "Гос. номер",
    "Марка машины",
    "Действия",
  ];
  const list = [
    {
      id: "11111",
      forwarder: "Смирнов А.А.",
      birth: "10.10.1990",
      number: "У125КХ76",
      carBrand: "MAN",
    },
    {
      id: "222222",
      forwarder: "Смирнов А.А.",
      birth: "10.10.1990",
      number: "У125КХ76",
      carBrand: "MAN",
    },
    {
      id: "333333",
      forwarder: "Смирнов А.А.",
      birth: "10.10.1990",
      number: "У125КХ76",
      carBrand: "MAN",
    },
  ];
  return (
    <>
      <FormAddForwarder />

      <TableSettings nameThead={cellNames} data={list} />
    </>
  );
}
