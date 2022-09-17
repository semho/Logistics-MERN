import React, { useEffect, useState } from "react";
import { useValidate } from "../../../../hooks/useValidate";
import {
  initialSettingsProduct,
  ISettingsProduct,
} from "../../../../models/Settings";
import { updateProduct } from "../../../../redux/features/settingsSlice";
import { useAppDispatch, useAppSelector } from "../../../../redux/store";
import { ButtonStyled } from "../../../Controls/ButtonStyled";
import { InputStyled } from "../../../Controls/InputStyled";
import { IFormEdit } from "../FormEditRecord/FormEditRecord";

export default function FormEditRecordProduct({
  setModalActiveEdit,
  id,
}: IFormEdit) {
  const dispatch = useAppDispatch();
  const [record, setRecord] = useState<ISettingsProduct>(
    initialSettingsProduct
  );
  const { emptyField } = useValidate();
  const recordById = useAppSelector((state) =>
    state.settings.statusSettings.allSettings.settingsProduct.find(
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
      if (emptyField(record.product, 'Поле ввода "Товар"')) return;
      if (emptyField(record.unit, 'Поле ввода "Единица измерения"')) return;

      dispatch(updateProduct({ record }));
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
          value={record.product}
          colorFocus="sky"
          type="text"
          placeholder="Товар"
          name="product"
          onChange={changeHandler}
          className="my-2"
        />
        <InputStyled
          value={record.unit}
          colorFocus="sky"
          type="text"
          placeholder="Единица измерения"
          name="unit"
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
