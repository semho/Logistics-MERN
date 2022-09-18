import React, { useEffect, useMemo, useState } from "react";
import { FormAddForwarder } from "../../../../components/Form/FormsForAddRecords/FormAddForwarder";
import { Loader } from "../../../../components/Loader";
import TableSettings from "../../../../components/Tables/TableSettings/TableSettings";
import { useShowError } from "../../../../hooks/useShowError";
import { getForwarders } from "../../../../redux/features/settingsSlice";
import { useAppDispatch, useAppSelector } from "../../../../redux/store";

export default function Forwarder() {
  const cellNames = [
    "#",
    "Ответственный",
    "Дата Рождения",
    "Гос. номер",
    "Марка машины",
    "Действия",
  ];

  const [list, setList] = useState([
    {
      id: "",
      type: "forwarder",
    },
  ]);

  const dispatch = useAppDispatch();
  //загружаем из БД в redux
  useEffect(() => {
    dispatch(getForwarders());
  }, [dispatch]);
  const loading = useAppSelector(
    (state) => state.settings.statusSettings.loading
  );
  const error = useAppSelector((state) => state.settings.statusSettings.error);
  //получаем список из redux
  const stateForwarders = useAppSelector(
    (state) => state.settings.statusSettings.allSettings.settingsForwarder
  );
  //прееобразуем его
  const stateForTable = useMemo(() => {
    return stateForwarders.map((record) => {
      return {
        id: record._id,
        forwarder: record.forwarder,
        birth: record.birth,
        carNumber: record.carNumber,
        carBrand: record.carBrand,
        type: "forwarder",
      };
    });
  }, [stateForwarders]);
  //и сохраняем в стейт
  useEffect(() => {
    setList(stateForTable);
  }, [stateForTable]);

  //показываем ошибки, если есть
  useShowError(error);

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <FormAddForwarder />
      {!loading && list.length === 0 && (
        <div className="text-center text-xl mt-20">Записей пока нет</div>
      )}
      {list.length > 0 && <TableSettings nameThead={cellNames} data={list} />}
    </>
  );
}
