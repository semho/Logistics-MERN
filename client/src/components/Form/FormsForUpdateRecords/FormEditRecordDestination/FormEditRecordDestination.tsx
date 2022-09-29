import React, { useEffect, useState } from "react";
import { useValidate } from "../../../../hooks/useValidate";
import {
  initialSettingsDestination,
  ISettingsDestination,
} from "../../../../models/Settings";
import { updateDestination } from "../../../../redux/features/settingsSlice";
import { useAppDispatch, useAppSelector } from "../../../../redux/store";
import { ButtonStyled } from "../../../UI/ButtonStyled";
import { InputStyled } from "../../../UI/InputStyled";
import { IFormEdit } from "../FormEditRecord/FormEditRecord";

export function FormEditRecordDestination({
  setModalActiveEdit,
  id,
}: IFormEdit) {
  const dispatch = useAppDispatch();
  const [record, setRecord] = useState<ISettingsDestination>(
    initialSettingsDestination
  );
  const { emptyField, zeroField } = useValidate();
  const recordById = useAppSelector((state) =>
    state.settings.statusSettings.allSettings.settingsDestination.find(
      (record) => record._id === id
    )
  );

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (record) {
      setRecord({
        ...record,
        [event.target.name]: event.target.value,
      });
    }
  };

  //редактирование записи
  const editRecordHandler = async () => {
    if (id && record) {
      if (emptyField(record.from, 'Поле ввода "Откуда"')) return;
      if (emptyField(record.to, 'Поле ввода "Куда"')) return;
      if (emptyField(record.sender, 'Поле ввода "Отправитель"')) return;
      if (emptyField(record.recipient, 'Поле ввода "Получатель"')) return;
      if (zeroField(record.distance, 'Поле ввода "Расстояние"')) return;

      dispatch(updateDestination({ record }));
      setModalActiveEdit(false);
    }
  };

  useEffect(() => {
    if (recordById) setRecord(recordById);
  }, [recordById]);
  return (
    <>
      <h3 className="text-xl text-center mb-5">
        Измененине записи №&nbsp;{id}
      </h3>
      <div>
        <InputStyled
          value={record.from}
          colorFocus="sky"
          type="text"
          placeholder="Откуда"
          name="from"
          onChange={changeHandler}
          className="my-2"
        />
        <InputStyled
          value={record.to}
          colorFocus="sky"
          type="text"
          placeholder="Куда"
          name="to"
          onChange={changeHandler}
          className="my-2"
        />
        <InputStyled
          value={record.sender}
          colorFocus="sky"
          type="text"
          placeholder="Отправитель"
          name="sender"
          onChange={changeHandler}
          className="my-2"
        />
        <InputStyled
          value={record.recipient}
          colorFocus="sky"
          type="text"
          placeholder="Получатель"
          name="recipient"
          onChange={changeHandler}
          className="my-2"
        />
        <InputStyled
          value={record.distance}
          colorFocus="sky"
          type="text"
          placeholder="Расстояние"
          name="distance"
          onChange={changeHandler}
          className="my-2"
        />
        <div className="text-center">
          <ButtonStyled
            title="Изменить"
            variant="sky"
            type="button"
            disabled={false}
            className="mr-5"
            onClick={editRecordHandler}
          />
          <ButtonStyled
            title="Отмена"
            variant="gray"
            type="button"
            disabled={false}
            onClick={() => setModalActiveEdit(false)}
          />
        </div>
      </div>
    </>
  );
}
