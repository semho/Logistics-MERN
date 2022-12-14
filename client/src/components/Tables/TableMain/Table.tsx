import React, { useEffect, useState } from "react";
import { FormForModalDelete } from "../../Form/FormsForDeleteRecords/FormDeleteRecord";
import { ModalPortalWithChildren as Modal } from "../../../ui/ModalPortalWithChildren";
import { TableContent } from "../../../ui/TableContent/TableContent";
import { FormEditRecordMain } from "../../Form/FormsForUpdateRecords/FormEditRecordMain";
import { TableRow } from "../TableRow";

interface IOBjRow {
  [key: string]: string | number;
}
interface IListOBjRow extends Array<IOBjRow> {}

interface ITable {
  headings: string[];
  records: IListOBjRow;
}

export function Table({ headings, records }: ITable) {
  const [list, setList] = useState<IListOBjRow>([]);
  const [type, setType] = useState("");
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
    if (list.length > 0) {
      setType(String(list[0].type));
    }
  }, [list, records]);

  return (
    <TableContent nameThead={headings}>
      {list.map((record, index) => {
        return (
          <TableRow
            key={record.id}
            id={String(record.id)}
            valueRow={record}
            index={index + 1}
            openModal={openModal}
          />
        );
      })}

      <Modal active={modalActiveDelete} setActive={setModalActiveDelete}>
        <FormForModalDelete
          setModalActiveDelete={setModalActiveDelete}
          id={idRecord}
          type={type}
        />
      </Modal>
      <Modal active={modalActiveEdit} setActive={setModalActiveEdit}>
        <FormEditRecordMain
          setModalActiveEdit={setModalActiveEdit}
          id={idRecord}
          type={type}
        />
      </Modal>
    </TableContent>
  );
}
