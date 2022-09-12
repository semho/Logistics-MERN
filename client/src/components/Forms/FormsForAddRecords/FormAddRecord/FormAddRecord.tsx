import React, { useState } from "react";
import {
  createRecord,
  dataRecords,
  IStoreListRecords,
} from "../../../../redux/features/recordSlice";
import { useAppDispatch, useAppSelector } from "../../../../redux/store";
import { ButtonStyled } from "../../../Controls/ButtonStyled";
import { InputStyled } from "../../../Controls/InputStyled";

export function FormAddRecord() {
  const [record, setRecord] = useState({});
  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRecord({ ...record, [event.target.name]: event.target.value });
  };
  const {
    statusRecords: { loading },
  }: IStoreListRecords = useAppSelector(dataRecords);
  const dispatch = useAppDispatch();
  //добавляем запись
  const addRecordHandler = async () => {
    const newRecord = { ...record };
    dispatch(createRecord({ newRecord }));
  };

  return (
    <>
      <h3 className="text-2xl mb-5 ">Добавить запись:</h3>
      <div className="form-group mb-6 flex flex-wrap">
        <div className="w-full md:w-1/6  px-3 mb-6 md:mb-0">
          <InputStyled
            colorFocus="sky"
            type="text"
            placeholder="Откуда-Куда"
            name="fromTo"
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
        <div className="w-full md:w-1/6 px-3 mb-6 md:mb-0">
          <InputStyled
            colorFocus="sky"
            type="text"
            placeholder="Продукт"
            name="product"
            onChange={changeHandler}
          />
        </div>
        <div className="w-full md:w-1/6 px-3 mb-6 md:mb-0">
          <InputStyled
            colorFocus="sky"
            type="text"
            placeholder="Количество"
            name="units"
            onChange={changeHandler}
          />
        </div>
        <div className="w-full md:w-1/6 px-3 mb-6 md:mb-0">
          <InputStyled
            colorFocus="sky"
            type="text"
            placeholder="Ответственный"
            name="forwarder"
            onChange={changeHandler}
          />
        </div>
        <div className="w-full md:w-1/6 lg:w-1/12 px-3 mb-6 md:mb-0">
          <InputStyled
            colorFocus="sky"
            type="text"
            placeholder="Цена"
            name="price"
            onChange={changeHandler}
          />
        </div>
        <div className="w-full md:w-full md:pt-5 lg:w-1/12 lg:pt-0 px-3 mb-6 md:mb-0">
          <ButtonStyled
            title="Добавить"
            variant="sky"
            type="button"
            disabled={loading}
            onClick={addRecordHandler}
          />
        </div>
      </div>
    </>
  );
}
