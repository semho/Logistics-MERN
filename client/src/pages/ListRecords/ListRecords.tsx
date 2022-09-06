import React, { useCallback, useEffect, useMemo, useState } from "react";
import { FormAddRecord } from "../../components/FormAddRecord";
import { Loader } from "../../components/Loader";
import { Table } from "../../components/Table";
import { useMessage } from "../../hooks/useMessage";
import { IListRecords, IRecord } from "../../models/Record";
import { dataUser, IStatusUser } from "../../redux/features/authSlice";
import {
  dataRecords,
  getRecords,
  IStoreListRecords,
} from "../../redux/features/recordSlice";
import { useAppDispatch, useAppSelector } from "../../redux/store";

export function ListRecords() {
  const message = useMessage();
  //данные пользователя из redux
  const {
    statusUser: { user },
  }: IStatusUser = useAppSelector(dataUser);
  const { token } = user || "";
  //диспач для получения записей в redux от сервера
  const dispatch = useAppDispatch();
  const recordsDispatch = useCallback(() => {
    dispatch(getRecords(token));
  }, [dispatch, token]);
  //вызываем этот колбэк в redux после монтирования
  useEffect(() => {
    recordsDispatch();
  }, [recordsDispatch]);
  //получаем актуальные данные таблицы записей из redux
  const state = useAppSelector((state) => state.records);
  const {
    statusRecords: { loading, error },
  }: IStoreListRecords = useAppSelector(dataRecords);

  const [list, setList] = useState<IListRecords>([]);
  const [errorRecord, setErrorRecord] = useState("");
  //показываем ошибки, если есть
  useEffect(() => {
    setErrorRecord((error as Error).message);
    error && message(errorRecord, "error");
  }, [error, errorRecord, message]);

  //обновляем массив объектов записей при изменении стейта
  useEffect(() => {
    setErrorRecord("");
    setList(state.statusRecords.listRecords);
  }, [state.statusRecords.listRecords]);

  //функция обновляет таблицу при добавлении нового значения из формы
  function addRecordList(value: IRecord) {
    setList((prev) => prev.concat(value));
  }
  //функция обновляет таблицу при удалении записи из списка
  function deleteRecordFromList(value: IRecord) {
    setList(list.filter((record) => record._id !== value._id));
  }

  //функция обновляет таблицу при изменения записи из списка
  function updateRecordFromList(value: IRecord) {
    setList(
      list.map((record) => {
        if (record._id === value._id) {
          return {
            ...record,
            fromTo: value.fromTo,
            distance: value.distance,
            product: value.product,
            units: value.units,
            forwarder: value.forwarder,
            price: value.price,
            sum: value.price * value.units,
          };
        }
        return record;
      })
    );
  }

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <FormAddRecord updateList={addRecordList} />
      {list.length > 0 && (
        <Table
          list={list}
          deleteRecordFromList={deleteRecordFromList}
          updateRecordFromList={updateRecordFromList}
        />
      )}

      {list.length === 0 && !loading && (
        <div className="text-center text-xl mt-20">Записей пока нет</div>
      )}
    </>
  );
}
