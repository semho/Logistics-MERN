import React, { useState } from "react";
import { useValidate } from "../../../../hooks/useValidate";
import { initialSettingsForwarderShort } from "../../../../models/Settings";
import { createForwarder } from "../../../../redux/features/settingsSlice";
import { useAppDispatch, useAppSelector } from "../../../../redux/store";
import { ButtonStyled } from "../../../../ui/ButtonStyled";
import { InputStyled } from "../../../../ui/InputStyled";

export function FormAddForwarder() {
  const { emptyField } = useValidate();
  const [record, setRecord] = useState(initialSettingsForwarderShort);
  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRecord({ ...record, [event.target.name]: event.target.value });
  };
  const loading = useAppSelector(
    (state) => state.settings.statusSettings.loading
  );
  const dispatch = useAppDispatch();
  const addRecordSettingsHandler = async () => {
    const newRecord = { ...record };
    if (emptyField(record.forwarder, 'Поле ввода "Фамилия И.О."')) return;
    if (emptyField(record.birth, 'Поле ввода "Дата рождения"')) return;
    if (emptyField(record.carNumber, 'Поле ввода "Гос.номер авто"')) return;
    if (emptyField(record.carBrand, 'Поле ввода "Марка авто"')) return;
    dispatch(createForwarder({ newRecord }));
  };

  return (
    <>
      <h3 className="text-2xl mb-5 mt-5">
        Добавить ответственного за доставку:
      </h3>
      <div className="form-group mb-6 flex flex-wrap justify-center">
        <div className="w-full md:w-1/6 px-3 mb-6 md:mb-0">
          <InputStyled
            colorFocus="sky"
            type="text"
            placeholder="Фамилия И.О."
            name="forwarder"
            onChange={changeHandler}
          />
        </div>
        <div className="w-full md:w-1/6 px-3 mb-6 md:mb-0">
          <InputStyled
            colorFocus="sky"
            type="text"
            placeholder="Дата Рождения"
            name="birth"
            onChange={changeHandler}
          />
        </div>
        <div className="w-full md:w-1/6 px-3 mb-6 md:mb-0">
          <InputStyled
            colorFocus="sky"
            type="text"
            placeholder="Гос. номер машины"
            name="carNumber"
            onChange={changeHandler}
          />
        </div>
        <div className="w-full md:w-1/6 px-3 mb-6 md:mb-0">
          <InputStyled
            colorFocus="sky"
            type="text"
            placeholder="Марка машины"
            name="carBrand"
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
