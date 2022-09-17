import React, { useState } from "react";
import {
  deleteDestination,
  deleteProduct,
} from "../../../../redux/features/settingsSlice";
import { useAppDispatch } from "../../../../redux/store";
import { ButtonStyled } from "../../../Controls/ButtonStyled";
import { CeilItem } from "../../TableMain/RecordItem/CeilItem";

import Modal from "../../../ModalWindows/ModalPortalWithChildren/ModalPortalWithChildren";
import TableCeil from "./TableCeil/TableCeil";
import FormEditRecordDestination from "../../../Form/FormsForUpdateRecords/FormEditRecordDestination/FormEditRecordDestination";
import FormEditRecordProduct from "../../../Form/FormsForUpdateRecords/FormEditRecordProduct/FormEditRecordProduct";

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
  const [isOpenDestination, setIsOpenDestination] = useState(false);
  const [isOpenProduct, setIsOpenProduct] = useState(false);
  const dispatch = useAppDispatch();

  const newObj = { ...valueRow };
  delete newObj.id;
  delete newObj.type;

  const removeRecord = async (id: string) => {
    if (valueRow.type === "destination") {
      dispatch(deleteDestination(id));
    }
    if (valueRow.type === "product") {
      dispatch(deleteProduct(id));
    }
  };
  const updateRecord = () => {
    if (valueRow.type === "destination") {
      setIsOpen(true);
      setIsOpenDestination(true);
    }
    if (valueRow.type === "product") {
      setIsOpen(true);
      setIsOpenProduct(true);
    }
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
          onClick={updateRecord}
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
        {isOpenDestination && (
          <FormEditRecordDestination setModalActiveEdit={setIsOpen} id={id} />
        )}
        {isOpenProduct && (
          <FormEditRecordProduct setModalActiveEdit={setIsOpen} id={id} />
        )}
      </Modal>
    </tr>
  );
}
