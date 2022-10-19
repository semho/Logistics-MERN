import React, { useEffect, useMemo, useState } from "react";
import { FormAddOrganization } from "../../../../components/Form/FormsForAddRecords/FormAddOrganization";
import { Table } from "../../../../components/Tables/TableMain";
import { useShowError } from "../../../../hooks/useShowError";
import {
  dataConversionOrganization,
  initialBodyTableOrganization,
  namesTableOrganization,
} from "../../../../models/settings/Organization";
import { useAppSelector } from "../../../../redux/store";
import { Loader } from "../../../../ui/Loader";

export function Organization() {
  const cellNames = namesTableOrganization;
  const [list, setList] = useState(initialBodyTableOrganization);

  const loading = useAppSelector(
    (state) => state.settings.statusSettings.loading
  );
  const error = useAppSelector((state) => state.settings.statusSettings.error);
  //показываем ошибки, если есть
  useShowError(error);

  //получаем список из redux
  const stateOrganization = useAppSelector(
    (state) => state.settings.statusSettings.allSettings.settingsOrganization
  );
  //преобразуем его
  const stateForTable = useMemo(() => {
    return dataConversionOrganization(stateOrganization);
  }, [stateOrganization]);

  //и сохраняем в стейт
  useEffect(() => {
    setList(stateForTable);
  }, [stateForTable]);

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <FormAddOrganization />
      {!loading && list.length === 0 && (
        <div className="text-center text-xl mt-20">Записей пока нет</div>
      )}
      {list.length > 0 && <Table headings={cellNames} records={list} />}
    </>
  );
}
