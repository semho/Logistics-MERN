import React, { useEffect, useState } from "react";
import { initialEmptyState, IRecord } from "../../../../models/Record";
import { updateRecord } from "../../../../redux/features/recordSlice";
import { useAppDispatch, useAppSelector } from "../../../../redux/store";
import { ButtonStyled } from "../../../../ui/ButtonStyled";
import { InputStyled } from "../../../../ui/InputStyled";

export interface IFormEdit {
  setModalActiveEdit: (value: React.SetStateAction<boolean>) => void;
  id: string;
}

export function FormEditRecord({ setModalActiveEdit, id }: IFormEdit) {
  const dispatch = useAppDispatch();
  const [record, setRecord] = useState<IRecord>(initialEmptyState);
  const recordById = useAppSelector((state) =>
    state.records.statusRecords.listRecords.find((record) => record._id === id)
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
      dispatch(updateRecord({ record }));
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
          value={record.fromTo}
          colorFocus="sky"
          type="text"
          placeholder="Откуда-Куда"
          name="fromTo"
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
        <InputStyled
          value={record.product}
          colorFocus="sky"
          type="text"
          placeholder="Продукт"
          name="product"
          onChange={changeHandler}
          className="my-2"
        />
        <InputStyled
          value={record.units}
          colorFocus="sky"
          type="text"
          placeholder="Количество"
          name="units"
          onChange={changeHandler}
          className="my-2"
        />
        <InputStyled
          value={record.forwarder}
          colorFocus="sky"
          type="text"
          placeholder="Ответственный"
          name="forwarder"
          onChange={changeHandler}
          className="my-2"
        />
        <InputStyled
          value={record.price}
          colorFocus="sky"
          type="text"
          placeholder="Стоимость единицы"
          name="price"
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
