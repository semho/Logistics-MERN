import React, { useState } from "react";
import {
  createRecord,
  dataRecords,
  IStoreListRecords,
} from "../../../../redux/features/recordSlice";
import { useAppDispatch, useAppSelector } from "../../../../redux/store";
import { ButtonStyled } from "../../../Controls/ButtonStyled";
import { InputStyled } from "../../../Controls/InputStyled";

export function FormAddProduct() {
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
            disabled={false}
            // onClick={addRecordHandler}
          />
        </div>
      </div>
    </>
  );
}
