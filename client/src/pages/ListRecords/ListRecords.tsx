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