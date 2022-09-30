import React, { useEffect, useState } from "react";
import { IListRecords } from "../../../models/Record";
import { FormForModalDelete } from "../../Form/FormsForDeleteRecords/FormDeleteRecord";
import { FormEditRecord } from "../../Form/FormsForUpdateRecords/FormEditRecord";
import { RecordItem } from "./RecordItem";
import { ModalPortalWithChildren as Modal } from "../../UI/ModalPortalWithChildren";
import { TableContent } from "../../UI/TableContent/TableContent";

interface ITable {
  headings:string[];
  records: IListRecords;
}

export function Table({headings, records}: ITable) {
  const [list, setList] = useState<IListRecords>([]);
  const [modalActiveDelete, setModalActiveDelete] = useState(false);
  const [modalActiveEdit, setModalActiveEdit] = useState(false);
  const [idRecord, setIdRecord] = useState("");

  //открываем модальное окно
  const openModal =
    (isDelete: boolean) => (event: React.MouseEvent<HTMLButtonElement>) => {
      isDelete ? setModalActiveDelete(true) : setModalActiveEdit(true);
      //получаем id записи для модального окна
      const idRecord = (event.target as HTMLButtonElement).parentElement
        ?.parentElement?.id;

      if (idRecord) {
        setIdRecord(idRecord);
      }
    };
  //обновляем массив объектов записей при изменении стейта
  useEffect(() => {
    setList(records);
  }, [records]);

  return (
    <TableContent nameThead={headings}>
      {list.map((record, index) => {
        return (
          <RecordItem
            record={record}
            index={index}
            openModal={openModal}
            key={record._id}
          />
        );
      })}
      <Modal active={modalActiveDelete} setActive={setModalActiveDelete}>
        <FormForModalDelete
          setModalActiveDelete={setModalActiveDelete}
          id={idRecord}
        />
      </Modal>
      <Modal active={modalActiveEdit} setActive={setModalActiveEdit}>
        <FormEditRecord setModalActiveEdit={setModalActiveEdit} id={idRecord} />
      </Modal>
    </TableContent>
  );
}
