import React from "react";
import { ButtonStyled } from "../../../ButtonStyled";
import { CeilItem } from "../../../Table/RecordItem/CeilItem";
import TableCeil from "./TableCeil/TableCeil";

interface IOBjRow {
  [key: string]: string | number;
}

interface ITableRow {
  id: string | number;
  valueRow: IOBjRow;
  index: number;
}

export default function TableRow({ id, valueRow, index }: ITableRow) {
  delete valueRow.id;

  return (
    <tr className="border-b" id={String(id)}>
      <CeilItem>{index}</CeilItem>
      {Object.values(valueRow).map((title) => (
        <TableCeil key={title} title={String(title)} />
      ))}
      <CeilItem className="w-1/4">
        <ButtonStyled
          title="Изменить"
          variant="sky"
          type="button"
          disabled={false}
          className="mr-2"
        />
        <ButtonStyled
          title="Удалить"
          variant="rose"
          type="button"
          disabled={false}
        />
      </CeilItem>
    </tr>
  );
}
