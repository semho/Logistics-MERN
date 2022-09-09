import React, { useState } from "react";
import {
  createRecord,
  dataRecords,
  IStoreListRecords,
} from "../../redux/features/recordSlice";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { ButtonStyled } from "../ButtonStyled";
import { InputStyled } from "../InputStyled";

export function FormAddPointsDestination() {
  const [record, setRecord] = useState({});
  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRecord({ ...record, [event.target.name]: event.target.value });
  };
  //TODO: добавить загрузку
  // const {
  //   statusRecords: { loading },
  // }: IStoreListRecords = useAppSelector(dataRecords);
  // const dispatch = useAppDispatch();
  // const addRecordHandler = async () => {
  //   const newRecord = { ...record };
  //TODO: добавить в redux
  //   dispatch();
  // };

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
            disabled={false}
            // onClick={addRecordHandler}
          />
        </div>
      </div>
    </>
  );
}
