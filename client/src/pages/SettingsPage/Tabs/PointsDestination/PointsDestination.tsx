import React, { useEffect, useMemo, useState } from "react";
import { FormAddPointsDestination } from "../../../../components/Form/FormsForAddRecords/FormAddPointsDestination";
import { Loader } from "../../../../ui/Loader";
import { useShowError } from "../../../../hooks/useShowError";
import { useAppSelector } from "../../../../redux/store";
import { Table } from "../../../../components/Tables/TableMain";
import {
  dataConversionDestination,
  initialBodyTableDestination,
  namesTableDestination,
} from "../../../../models/settings/PointDestination";

export function PointsDestination() {
  const cellNames = namesTableDestination;
  const [list, setList] = useState(initialBodyTableDestination);

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
    return dataConversionDestination(stateDestination);
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
      {list.length > 0 && <Table headings={cellNames} records={list} />}
    </>
  );
}
