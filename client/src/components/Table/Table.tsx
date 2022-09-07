import React, { useEffect, useState } from "react";
import { IListRecords, initialEmptyState, IRecord } from "../../models/Record";
import { Modal } from "../Modal/Modal";
import { deleteRecord, updateRecord } from "../../redux/features/recordSlice";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { toast } from "react-toastify";
import { useToken } from "../../hooks/useToken";
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
  const [record, setRecord] = useState<IRecord>(initialEmptyState);
  const dispatch = useAppDispatch();
  const token = useToken();
  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (record) {
      setRecord({
        ...record,
        [event.target.name]: event.target.value,
      });
    }
  };
  //удаление записи
  const removeRecord = async () => {
    if (record) {
      dispatch(deleteRecord({ record, token, toast }));
      setModalActiveDelete(false);
    }
  };
  //редактирование записи
  const editRecordHandler = async () => {
    if (record) {
      dispatch(updateRecord({ record, token, toast }));
      setModalActiveEdit(false);
    }
  };
  //открываем модальное окно
  const openModal =
    (isDelete: boolean) => (event: React.MouseEvent<HTMLButtonElement>) => {
      isDelete ? setModalActiveDelete(true) : setModalActiveEdit(true);
      //получаем id записи для модального окна
      const idRecord = (event.target as HTMLButtonElement).parentElement!
        .parentElement!.id;
      const record = list.find((record) => record._id === idRecord);

      if (record) {
        setRecord(record);
      }
    };
  //обновляем массив объектов записей при изменении стейта
  useEffect(() => {
    setList(state.statusRecords.listRecords);
  }, [state.statusRecords.listRecords]);

  if (list.length === 0 && !state.statusRecords.loading) {
    return <div className="text-center text-xl mt-20">Записей пока нет</div>;
  }

  return (
    <div className="flex flex-col">
      <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
          <div className="overflow-hidden">
            <table className="min-w-full">
              <TableHead />
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
          id={record._id}
          removeRecord={removeRecord}
          setModalActiveDelete={setModalActiveDelete}
        />
      </Modal>
      <Modal active={modalActiveEdit} setActive={setModalActiveEdit}>
        <FormForModalEdit
          record={record}
          changeHandler={changeHandler}
          setModalActiveEdit={setModalActiveEdit}
          editRecordHandler={editRecordHandler}
        />
      </Modal>
    </div>
  );
}
