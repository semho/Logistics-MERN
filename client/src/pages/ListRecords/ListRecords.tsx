import React, { useCallback, useEffect, useState } from "react";
import { FormAddRecord } from "../../components/FormAddRecord";
import { Loader } from "../../components/Loader";
import { Table } from "../../components/Table";
import { useMessage } from "../../hooks/useMessage";
import { useToken } from "../../hooks/useToken";
import {
  dataRecords,
  getRecords,
  IStoreListRecords,
} from "../../redux/features/recordSlice";
import { useAppDispatch, useAppSelector } from "../../redux/store";

export function ListRecords() {
  const [errorRecord, setErrorRecord] = useState("");
  const {
    statusRecords: { loading, error },
  }: IStoreListRecords = useAppSelector(dataRecords);
  const message = useMessage();
  const token = useToken();
  //диспач для получения записей в redux от сервера
  const dispatch = useAppDispatch();
  const recordsDispatch = useCallback(() => {
    dispatch(getRecords(token));
  }, [dispatch, token]);
  //вызываем этот колбэк в redux после монтирования
  useEffect(() => {
    recordsDispatch();
  }, [recordsDispatch]);
  //показываем ошибки, если есть
  useEffect(() => {
    setErrorRecord((error as Error).message);
    error && message(errorRecord, "error");
  }, [error, errorRecord, message]);
  //удаляем ошибки
  useEffect(() => {
    setErrorRecord("");
  }, []);

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
