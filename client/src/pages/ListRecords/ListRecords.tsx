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
import { dataConversionRecord, namesTableRecord } from "../../models/Record";
import { Select } from "../../ui/Select";

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

  const cellNames = namesTableRecord;

  const stateForTable = useMemo(() => {
    return dataConversionRecord(listRecords);
  }, [listRecords]);

  useEffect(() => {
    setList(stateForTable);
  }, [stateForTable]);

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <Select />
      <FormAddRecord />
      {!loading && listRecords.length === 0 && (
        <div className="text-center text-xl mt-20">Записей пока нет</div>
      )}
      {listRecords.length > 0 && <Table headings={cellNames} records={list} />}
    </>
  );
}
