import React from "react";
import { FormAddPointsDestination } from "../../../../components/FormAddPointsDestination";
import TableSettings from "../../../../components/Tables/ForSettings/TableSettings";

export default function PointsDestination() {
  const cellNames = [
    "#",
    "Откуда->Куда",
    "Кто->Кому",
    "Расстояние, км",
    "Действия",
  ];
  const list = [
    {
      id: "111",
      fromTo: "ОТ->КУДА",
      senderToRecipient: "Кто->Кому",
      distance: "20",
    },
    {
      id: "2222",
      fromTo: "ОТ->КУДА",
      senderToRecipient: "Кто->Кому",
      distance: "30",
    },
    {
      id: "333",
      fromTo: "ОТ->КУДА",
      senderToRecipient: "Кто->Кому",
      distance: "40",
    },
  ];
  return (
    <>
      <FormAddPointsDestination />
      <TableSettings nameThead={cellNames} data={list} />
    </>
  );
}
