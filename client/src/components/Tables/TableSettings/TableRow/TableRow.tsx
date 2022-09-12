import React, { useState } from "react";
import { deleteDestination } from "../../../../redux/features/settingsSlice";
import { useAppDispatch } from "../../../../redux/store";
import { ButtonStyled } from "../../../Controls/ButtonStyled";
import { CeilItem } from "../../TableMain/RecordItem/CeilItem";

import Modal from "../../../ModalWindows/ModalPortalWithChildren/ModalPortalWithChildren";
import TableCeil from "./TableCeil/TableCeil";
import FormEditRecordDestination from "../../../Forms/FormsForUpdateRecords/FormEditRecordDestination/FormEditRecordDestination";

interface IOBjRow {
  [key: string]: string | number;
}

interface ITableRow {
  id: string;
  valueRow: IOBjRow;
  index: number;
}

export default function TableRow({ id, valueRow, index }: ITableRow) {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useAppDispatch();

  const newObj = { ...valueRow };
  delete newObj.id;
  delete newObj.type;

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
          onClick={() => setIsOpen(true)}
        />

        <ButtonStyled
          title="Удалить"
          variant="rose"
          type="button"
          disabled={false}
          onClick={() => removeRecord(id)}
        />
      </CeilItem>
      <Modal active={isOpen} setActive={setIsOpen}>
        <FormEditRecordDestination setModalActiveEdit={setIsOpen} id={id} />
      </Modal>
    </tr>
  );
}
