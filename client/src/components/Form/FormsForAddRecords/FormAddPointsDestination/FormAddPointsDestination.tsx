import React, { useState } from "react";
import { useValidate } from "../../../../hooks/useValidate";
import { initialSettingsDestinationShort } from "../../../../models/Settings";
import { createDestination } from "../../../../redux/features/settingsSlice";
import { useAppDispatch, useAppSelector } from "../../../../redux/store";
import { ButtonStyled } from "../../../UI/ButtonStyled";
import { InputStyled } from "../../../UI/InputStyled";

export function FormAddPointsDestination() {
  const { emptyField, zeroField } = useValidate();
  const [record, setRecord] = useState(initialSettingsDestinationShort);
  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRecord({ ...record, [event.target.name]: event.target.value });
  };
  const loading = useAppSelector(
    (state) => state.settings.statusSettings.loading
  );
  const dispatch = useAppDispatch();
  const addRecordSettingsHandler = async () => {
    const newRecord = { ...record };
    if (emptyField(record.from, 'Поле ввода "Откуда"')) return;
    if (emptyField(record.to, 'Поле ввода "Куда"')) return;
    if (emptyField(record.sender, 'Поле ввода "Отправитель"')) return;
    if (emptyField(record.recipient, 'Поле ввода "Получатель"')) return;
    if (zeroField(record.distance, 'Поле ввода "Расстояние"')) return;

    dispatch(createDestination({ newRecord }));
  };

  return (
    <>
      <h3 className="text-2xl mb-5 mt-5">
        Добавить пункт отправления-назначения:
      </h3>
      <div className="form-group mb-6 flex flex-wrap justify-center">
        <div className="w-full md:w-1/6 px-3 mb-6 md:mb-0">
          <InputStyled
            colorFocus="sky"
            type="text"
            placeholder="Откуда"
            name="from"
            onChange={changeHandler}
          />
        </div>
        <div className="w-full md:w-1/6 px-3 mb-6 md:mb-0">
          <InputStyled
            colorFocus="sky"
            type="text"
            placeholder="Куда"
            name="to"
            onChange={changeHandler}
          />
        </div>
        <div className="w-full md:w-1/6 px-3 mb-6 md:mb-0">
          <InputStyled
            colorFocus="sky"
            type="text"
            placeholder="Отправитель"
            name="sender"
            onChange={changeHandler}
          />
        </div>
        <div className="w-full md:w-1/6 px-3 mb-6 md:mb-0">
          <InputStyled
            colorFocus="sky"
            type="text"
            placeholder="Получатель"
            name="recipient"
            onChange={changeHandler}
          />
        </div>
        <div className="w-full md:w-1/6 px-3 mb-6 md:mb-0">
          <InputStyled
            colorFocus="sky"
            type="text"
            placeholder="Расстояние"
            name="distance"
            onChange={changeHandler}
          />
        </div>
        <div className="w-full md:pt-0 md:w-1/6 lg:pt-0 px-3 mb-6 md:mb-0">
          <ButtonStyled
            title="Добавить"
            variant="sky"
            type="button"
            disabled={loading}
            onClick={addRecordSettingsHandler}
          />
        </div>
      </div>
    </>
  );
}
