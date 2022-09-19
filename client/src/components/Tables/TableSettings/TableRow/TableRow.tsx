import React, { useState } from "react";
import {
  deleteDestination,
  deleteForwarder,
  deleteProduct,
} from "../../../../redux/features/settingsSlice";
import { useAppDispatch } from "../../../../redux/store";
import { ButtonStyled } from "../../../Controls/ButtonStyled";
import { CeilItem } from "../../TableMain/RecordItem/CeilItem";

import { ModalPortalWithChildren as Modal } from "../../../ModalWindows/ModalPortalWithChildren";
import { TableCeil } from "./TableCeil";
import { FormEditRecordDestination } from "../../../Form/FormsForUpdateRecords/FormEditRecordDestination";
import { FormEditRecordProduct } from "../../../Form/FormsForUpdateRecords/FormEditRecordProduct";
import { FormEditRecordForwarder } from "../../../Form/FormsForUpdateRecords/FormEditRecordForwarder";

interface IOBjRow {
  [key: string]: string | number;
}

interface ITableRow {
  id: string;
  valueRow: IOBjRow;
  index: number;
}

export function TableRow({ id, valueRow, index }: ITableRow) {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenDestination, setIsOpenDestination] = useState(false);
  const [isOpenProduct, setIsOpenProduct] = useState(false);
  const [isOpenForwarder, setIsOpenForwarder] = useState(false);
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
    if (valueRow.type === "forwarder") {
      dispatch(deleteForwarder(id));
    }
  };
  const updateRecord = () => {
    setIsOpen(true);
    if (valueRow.type === "destination") {
      setIsOpenDestination(true);
    }
    if (valueRow.type === "product") {
      setIsOpenProduct(true);
    }
    if (valueRow.type === "forwarder") {
      setIsOpenForwarder(true);
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
        {isOpenForwarder && (
          <FormEditRecordForwarder setModalActiveEdit={setIsOpen} id={id} />
        )}
      </Modal>
    </tr>
  );
}
