import React, { useState } from "react";

import { ButtonStyled } from "../../UI/ButtonStyled";
import { TableCeilContent } from "../../UI/TableCeilContent";

import { ModalPortalWithChildren as Modal } from "../../UI/ModalPortalWithChildren";
import { FormEditRecordDestination } from "../../Form/FormsForUpdateRecords/FormEditRecordDestination";
import { FormEditRecordProduct } from "../../Form/FormsForUpdateRecords/FormEditRecordProduct";
import { FormEditRecordForwarder } from "../../Form/FormsForUpdateRecords/FormEditRecordForwarder";
import { TableCeilTitle } from "../../UI/TableCeilTitle";

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
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenDestination, setIsOpenDestination] = useState(false);
  const [isOpenProduct, setIsOpenProduct] = useState(false);
  const [isOpenForwarder, setIsOpenForwarder] = useState(false);

  const newObj = { ...valueRow };
  delete newObj.id;
  delete newObj.type;

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
      <TableCeilContent>{index}</TableCeilContent>
      {Object.values(newObj).map((title) => (
        <TableCeilTitle key={title} title={String(title)} />
      ))}
      <TableCeilContent className="w-1/4">
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
          onClick={openModal(true)}
        />
      </TableCeilContent>
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
