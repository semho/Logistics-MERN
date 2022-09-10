import React, { useCallback, useEffect, useState } from "react";
import { FormAddPointsDestination } from "../../../../components/FormAddPointsDestination";
import { Loader } from "../../../../components/Loader";
import TableSettings from "../../../../components/Tables/ForSettings/TableSettings";
import { useShowError } from "../../../../hooks/useShowError";
import { getDestinations } from "../../../../redux/features/settingsSlice";
import { useAppDispatch, useAppSelector } from "../../../../redux/store";

export default function PointsDestination() {
  const [list, setList] = useState([{ id: "" }]);
  const cellNames = [
    "#",
    "Откуда->Куда",
    "Кто->Кому",
    "Расстояние, км",
    "Действия",
  ];
  const dispatch = useAppDispatch();
  //загружаем из БД в redux
  useEffect(() => {
    dispatch(getDestinations());
  }, [dispatch]);

  const loading = useAppSelector(
    (state) => state.settings.statusSettings.loading
  );
  const error = useAppSelector((state) => state.settings.statusSettings.error);
  //получаем список из redux
  const stateDestination = useAppSelector(
    (state) => state.settings.statusSettings.allSettings.settingsDestination
  );
  //прееобразуем его
  const stateForTable = useCallback(() => {
    return stateDestination.map((record) => {
      return {
        id: record._id,
        fromTo: `${record.from} -> ${record.to}`,
        senderToRecipient: `${record.sender} -> ${record.recipient}`,
        distance: record.distance,
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
      <TableSettings nameThead={cellNames} data={list} />
    </>
  );
}
