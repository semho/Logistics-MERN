import React, { useEffect, useMemo, useState } from "react";
import { FormAddForwarder } from "../../../../components/Form/FormsForAddRecords/FormAddForwarder";
import { Loader } from "../../../../components/UI/Loader";
import { useShowError } from "../../../../hooks/useShowError";
import { useAppSelector } from "../../../../redux/store";
import { TableContent } from "../../../../components/UI/TableContent/TableContent";
import { TableRow } from "../../../../components/Tables/TableRow";

export function Forwarder() {
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
      id: "#",
      forwarder: "Ответственный",
      birth: "Дата рождения",
      carNumber: "Гос.номер",
      carBrand: "Марка машины",
      type: "forwarder",
    },
  ]);

  const loading = useAppSelector(
    (state) => state.settings.statusSettings.loading
  );
  const error = useAppSelector((state) => state.settings.statusSettings.error);
  //получаем список из redux
  const stateForwarders = useAppSelector(
    (state) => state.settings.statusSettings.allSettings.settingsForwarder
  );
  //преобразуем его
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
      {list.length > 0 && (
        <TableContent nameThead={cellNames}>
          {list.map((item, index) => {
            return (
              <TableRow
                key={item.id}
                id={item.id}
                valueRow={item}
                index={index + 1}
              />
            );
          })}
        </TableContent>
      )}
    </>
  );
}
