import React from "react";
import { IRecord } from "../../../models/Record";
import { ButtonStyled } from "../../ButtonStyled";
import { InputStyled } from "../../InputStyled";

interface IFormEdit {
  record: IRecord;
  editRecordHandler: () => Promise<void>;
  setModalActiveEdit: (value: React.SetStateAction<boolean>) => void;
  changeHandler: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function FormForModalEdit({
  record,
  changeHandler,
  setModalActiveEdit,
  editRecordHandler,
}: IFormEdit) {
  return (
    <>
      <h3 className="text-xl text-center mb-5">
        Измененине записи №&nbsp;{record?._id}
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
