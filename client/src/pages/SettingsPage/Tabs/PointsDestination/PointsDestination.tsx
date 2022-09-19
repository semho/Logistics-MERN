import React, { useEffect, useMemo, useState } from "react";
import { FormAddPointsDestination } from "../../../../components/Form/FormsForAddRecords/FormAddPointsDestination";
import { Loader } from "../../../../components/Loader";
import { TableSettings } from "../../../../components/Tables/TableSettings";
import { useShowError } from "../../../../hooks/useShowError";
import { useAppSelector } from "../../../../redux/store";

export function PointsDestination() {
  const [list, setList] = useState([
    {
      id: "",
      type: "destination",
    },
  ]);
  const cellNames = [
    "#",
    "Откуда->Куда",
    "Кто->Кому",
    "Расстояние, км",
    "Действия",
  ];

  const loading = useAppSelector(
    (state) => state.settings.statusSettings.loading
  );
  const error = useAppSelector((state) => state.settings.statusSettings.error);
  //получаем список из redux
  const stateDestination = useAppSelector(
    (state) => state.settings.statusSettings.allSettings.settingsDestination
  );
  //прееобразуем его
  const stateForTable = useMemo(() => {
    return stateDestination.map((record) => {
      return {
        id: record._id,
        fromTo: `${record.from} -> ${record.to}`,
        senderToRecipient: `${record.sender} -> ${record.recipient}`,
        distance: record.distance,
        type: "destination",
      };
    });
  }, [stateDestination]);
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
      <FormAddPointsDestination />
      {!loading && list.length === 0 && (
        <div className="text-center text-xl mt-20">Записей пока нет</div>
      )}
      {list.length > 0 && <TableSettings nameThead={cellNames} data={list} />}
    </>
  );
}
