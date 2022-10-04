import React from "react";
import { IRecord } from "../../../../models/Record";
import { formatDate } from "../../../../utils/formatDate";
import { ButtonStyled } from "../../../../ui/ButtonStyled";
import { TableCeilContent } from "../../../../ui/TableCeilContent";

interface IRecordItem {
  record: IRecord;
  index: number;
  openModal: (
    isDelete: boolean
  ) => (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

export function RecordItem({ record, index, openModal }: IRecordItem) {
  return (
    <tr className="border-b" key={record._id} id={record._id}>
      <TableCeilContent>{index + 1}</TableCeilContent>
      <TableCeilContent>{formatDate(record.date)}</TableCeilContent>
      <TableCeilContent>{record.fromTo}</TableCeilContent>
      <TableCeilContent>{record.distance}</TableCeilContent>
      <TableCeilContent>{record.product}</TableCeilContent>
      <TableCeilContent>{record.units}</TableCeilContent>
      <TableCeilContent>{record.forwarder}</TableCeilContent>
      <TableCeilContent>{record.price}</TableCeilContent>
      <TableCeilContent>{record.sum}</TableCeilContent>
      <TableCeilContent>
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
