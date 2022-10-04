import React, { useCallback, useEffect } from "react";
import { FormAddRecord } from "../../components/Form/FormsForAddRecords/FormAddRecord";
import { Loader } from "../../ui/Loader";
import { Table } from "../../components/Tables/TableMain";
import { useShowError } from "../../hooks/useShowError";
import {
  dataRecords,
  getRecords,
  IStoreListRecords,
} from "../../redux/features/recordSlice";
import { useAppDispatch, useAppSelector } from "../../redux/store";

export function ListRecords() {
  const {
    statusRecords: { loading, error, listRecords },
  }: IStoreListRecords = useAppSelector(dataRecords);

  //диспач для получения записей в redux от сервера
  const dispatch = useAppDispatch();
  const recordsDispatch = useCallback(() => {
    dispatch(getRecords());
  }, [dispatch]);
  //вызываем этот колбэк в redux после монтирования
  useEffect(() => {
    recordsDispatch();
  }, [recordsDispatch]);
  //показываем ошибки, если есть
  useShowError(error);

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

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <FormAddRecord />
      {!loading && listRecords.length === 0 && (
        <div className="text-center text-xl mt-20">Записей пока нет</div>
      )}
      {listRecords.length > 0 && (
        <Table headings={cellNames} records={listRecords} />
      )}
    </>
  );
}
