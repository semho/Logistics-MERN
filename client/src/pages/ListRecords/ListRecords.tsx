import React, { useCallback, useContext, useEffect, useState } from "react";
import { FormAddRecord } from "../../components/FormAddRecord";
import { Loader } from "../../components/Loader";
import { Table } from "../../components/Table";
import { AuthContext } from "../../context/AuthContext";
import { useHttp } from "../../hooks/useHttp";
import { useMessage } from "../../hooks/useMessage";
import { IListRecords, IRecord } from "../../models/Record";

export function ListRecords() {
  const [list, setList] = useState<IListRecords>([]);
  const { loading, request, error, clearError } = useHttp();
  const { token } = useContext(AuthContext);
  const message = useMessage();

  useEffect(() => {
    message(error, "error");
    clearError();
  }, [clearError, error, message]);

  const fetchRecords = useCallback(async () => {
    try {
      const fetched = await request("/api/records/", "GET", null, {
        Authorization: `Bearer ${token}`,
      });
      setList(fetched);
    } catch (e) {}
  }, [request, token]);

  useEffect(() => {
    fetchRecords();
  }, [fetchRecords]);
  //функция обновляет таблицу при добавлении нового значения из формы
  function updateList(value: IRecord) {
    setList((prev) => prev.concat(value));
  }

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <FormAddRecord updateList={updateList} />
      {list.length > 0 && <Table list={list} />}

      {list.length === 0 && !loading && (
        <div className="text-center text-xl mt-20">Записей пока нет</div>
      )}
    </>
  );
}
