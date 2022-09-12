import React from "react";
import { IRecord } from "../../../../models/Record";
import { formatDate } from "../../../../utils/formatDate";
import { ButtonStyled } from "../../../Controls/ButtonStyled";
import { CeilItem } from "./CeilItem";

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
      <CeilItem>{index + 1}</CeilItem>
      <CeilItem>{formatDate(record.date)}</CeilItem>
      <CeilItem>{record.fromTo}</CeilItem>
      <CeilItem>{record.distance}</CeilItem>
      <CeilItem>{record.product}</CeilItem>
      <CeilItem>{record.units}</CeilItem>
      <CeilItem>{record.forwarder}</CeilItem>
      <CeilItem>{record.price}</CeilItem>
      <CeilItem>{record.sum}</CeilItem>
      <CeilItem>
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
      </CeilItem>
    </tr>
  );
}
