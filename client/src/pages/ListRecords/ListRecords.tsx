import React, { useCallback, useEffect, useMemo, useState } from "react";
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
import { formatDate } from "../../utils/formatDate";

export function ListRecords() {
  const {
    statusRecords: { loading, error, listRecords },
  }: IStoreListRecords = useAppSelector(dataRecords);
  const [list, setList] = useState([{}]);
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

  const stateForTable = useMemo(() => {
    return listRecords.map((record) => {
      return {
        id: record._id,
        date: formatDate(record.date),
        fromTo: record.fromTo,
        distance: record.distance,
        product: record.product,
        units: record.units,
        forwarder: record.forwarder,
        price: record.price,
        sum: record.sum,
        type: "record",
      };
    });
  }, [listRecords]);

  useEffect(() => {
    setList(stateForTable);
  }, [stateForTable]);

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <FormAddRecord />
      {!loading && listRecords.length === 0 && (
        <div className="text-center text-xl mt-20">Записей пока нет</div>
      )}
      {listRecords.length > 0 && <Table headings={cellNames} records={list} />}
    </>
  );
}
