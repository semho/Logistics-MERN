import React from "react";
import { ButtonStyled } from "../../../ui/ButtonStyled";
import { TableCeilContent } from "../../../ui/TableCeilContent";
import { TableCeilTitle } from "../../../ui/TableCeilTitle";

interface IOBjRow {
  [key: string]: string | number;
}

interface ITableRow {
  id: string;
  valueRow: IOBjRow;
  index: number;
  openModal: (
    isDelete: boolean
  ) => (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

export function TableRow({ id, valueRow, index, openModal }: ITableRow) {
  const newObj = { ...valueRow };
  delete newObj.id;
  delete newObj.type;

  return (
    <tr className="border-b" id={id} key={id}>
      <TableCeilContent>{index}</TableCeilContent>
      {Object.values(newObj).map((title) => (
        <TableCeilTitle key={title} title={String(title)} />
      ))}
      <TableCeilContent className="w-1/6">
        <ButtonStyled
          title="Изменить"
          variant="sky"
          type="button"
          disabled={false}
          className="mr-2"
          onClick={openModal(false)}
        />

        <ButtonStyled
          title="Удалить"
          variant="rose"
          type="button"
          disabled={false}
          onClick={openModal(true)}
        />
      </TableCeilContent>
    </tr>
  );
}
