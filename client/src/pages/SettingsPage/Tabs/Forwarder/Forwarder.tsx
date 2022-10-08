import React, { useEffect, useMemo, useState } from "react";
import { FormAddForwarder } from "../../../../components/Form/FormsForAddRecords/FormAddForwarder";
import { Loader } from "../../../../ui/Loader";
import { useShowError } from "../../../../hooks/useShowError";
import { useAppSelector } from "../../../../redux/store";
import { Table } from "../../../../components/Tables/TableMain";
import {
  dataConversionForwarder,
  initialBodyTableForwarder,
  namesTableForwarder,
} from "../../../../models/settings/Forwarder";

export function Forwarder() {
  const cellNames = namesTableForwarder;
  const [list, setList] = useState(initialBodyTableForwarder);

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
    return dataConversionForwarder(stateForwarders);
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
      {list.length > 0 && <Table headings={cellNames} records={list} />}
    </>
  );
}
