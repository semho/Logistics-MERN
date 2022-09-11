import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { deleteDestination } from "../../../../redux/features/settingsSlice";
import { useAppDispatch } from "../../../../redux/store";
import { ButtonStyled } from "../../../ButtonStyled";
import ModalPortal from "../../../ModalWindows/ModalPortal/ModalPortal";
import { CeilItem } from "../../../Table/RecordItem/CeilItem";
import TableCeil from "./TableCeil/TableCeil";

interface IOBjRow {
  [key: string]: string | number;
}

interface ITableRow {
  id: string;
  valueRow: IOBjRow;
  index: number;
}

export default function TableRow({ id, valueRow, index }: ITableRow) {
  const navigate = useNavigate();

  const openModal = async (id: string) => {
    navigate(`/settings/${valueRow.type}/${id}`);
  };

  const newObj = { ...valueRow };
  delete newObj.id;
  delete newObj.type;

  const dispatch = useAppDispatch();
  const removeRecord = async (id: string) => {
    dispatch(deleteDestination(id));
  };
  return (
    <tr className="border-b" id={id} key={id}>
      <CeilItem>{index}</CeilItem>
      {Object.values(newObj).map((title) => (
        <TableCeil key={title} title={String(title)} />
      ))}
      <CeilItem className="w-1/4">
        <ButtonStyled
          title="Изменить"
          variant="sky"
          type="button"
          disabled={false}
          className="mr-2"
          onClick={() => openModal(id)}
        />

        <ButtonStyled
          title="Удалить"
          variant="rose"
          type="button"
          disabled={false}
          onClick={() => removeRecord(id)}
        />
      </CeilItem>
    </tr>
  );
}
