import React, { useState } from "react";
import { useValidate } from "../../../../hooks/useValidate";
import { initialSettingsProductShort } from "../../../../models/Settings";
import { createProduct } from "../../../../redux/features/settingsSlice";
import { useAppDispatch, useAppSelector } from "../../../../redux/store";
import { ButtonStyled } from "../../../UI/ButtonStyled";
import { InputStyled } from "../../../UI/InputStyled";

export function FormAddProduct() {
  const { emptyField } = useValidate();
  const [record, setRecord] = useState(initialSettingsProductShort);
  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRecord({ ...record, [event.target.name]: event.target.value });
  };
  const loading = useAppSelector(
    (state) => state.settings.statusSettings.loading
  );
  const dispatch = useAppDispatch();
  const addRecordSettingsHandler = async () => {
    const newRecord = { ...record };
    if (emptyField(record.product, 'Поле ввода "Товар"')) return;
    if (emptyField(record.unit, 'Поле ввода "Единица измерения"')) return;
    dispatch(createProduct({ newRecord }));
  };

  return (
    <>
      <h3 className="text-2xl mb-5 mt-5">Добавить товар в список:</h3>
      <div className="form-group mb-6 flex flex-wrap justify-center">
        <div className="w-full md:w-1/6 px-3 mb-6 md:mb-0">
          <InputStyled
            colorFocus="sky"
            type="text"
            placeholder="Товар"
            name="product"
            onChange={changeHandler}
          />
        </div>
        <div className="w-full md:w-1/6 px-3 mb-6 md:mb-0">
          <InputStyled
            colorFocus="sky"
            type="text"
            placeholder="Единица измерения"
            name="unit"
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
