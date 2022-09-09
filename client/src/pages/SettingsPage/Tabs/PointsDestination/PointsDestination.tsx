import React from "react";
import { FormAddPointsDestination } from "../../../../components/FormAddPointsDestination";
import TableSettings from "../../../../components/Tables/ForSettings/TableSettings";

export default function PointsDestination() {
  const cellNames = ["#", "Откуда-Куда", "Расстояние, км", "Действия"];
  const list = [
    { id: "111", fromTo: "ОТ-КУДА", distance: "20" },
    { id: "2222", fromTo: "ОТ-КУДА", distance: "30" },
    { id: "333", fromTo: "ОТ-КУДА", distance: "40" },
  ];
  return (
    <>
      <div className="lg:flex pt-5 justify-center">
        <FormAddPointsDestination />
      </div>
      <TableSettings nameThead={cellNames} data={list} />
    </>
  );
}
