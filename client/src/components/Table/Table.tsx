import React, { useEffect, useState } from "react";
import { IListRecords } from "../../models/Record";
import Modal from "../ModalWindows/ModalWithChildren/ModalWithChildren";
import { useAppSelector } from "../../redux/store";
import { RecordItem } from "./RecordItem";
import { TableHead } from "./TableHead";
import FormForModalDelete from "./FormForModalDelete/FormForModalDelete";
import FormForModalEdit from "./FormForModalEdit/FormForModalEdit";

export function Table() {
  const [list, setList] = useState<IListRecords>([]);
  //получаем актуальные данные таблицы записей из redux
  const state = useAppSelector((state) => state.records);
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
    setList(state.statusRecords.listRecords);
  }, [state.statusRecords.listRecords]);

  if (list.length === 0 && !state.statusRecords.loading) {
    return <div className="text-center text-xl mt-20">Записей пока нет</div>;
  }

  const cellNames = [
    "#",
    "Дата",
    "Откуда-Куда",
    "Расстояние, км",
    "Товар",
    "Количество, м3",
    "Ответственный",
    "Стоимость единицы, руб",
    "Сумма товара, руб",
    "Действия",
  ];

  return (
    <div className="flex flex-col">
      <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
          <div className="overflow-hidden">
            <table className="min-w-full">
              <TableHead cellNames={cellNames} />
              <tbody>
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
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Modal active={modalActiveDelete} setActive={setModalActiveDelete}>
        <FormForModalDelete
          setModalActiveDelete={setModalActiveDelete}
          id={idRecord}
        />
      </Modal>
      <Modal active={modalActiveEdit} setActive={setModalActiveEdit}>
        <FormForModalEdit
          setModalActiveEdit={setModalActiveEdit}
          id={idRecord}
        />
      </Modal>
    </div>
  );
}
