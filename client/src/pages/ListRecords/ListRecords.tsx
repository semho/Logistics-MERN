import React, { useCallback, useEffect } from "react";
import { FormAddRecord } from "../../components/Forms/FormsForAddRecords/FormAddRecord";
import { Loader } from "../../components/Loader";
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
    statusRecords: { loading, error },
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

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <FormAddRecord />
      <Table />
    </>
  );
}
