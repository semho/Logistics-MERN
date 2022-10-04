import React, { useEffect, useState } from "react";
import { useValidate } from "../../../../hooks/useValidate";
import {
  initialSettingsForwarder,
  ISettingsForwarder,
} from "../../../../models/Settings";
import { updateForwarder } from "../../../../redux/features/settingsSlice";
import { useAppDispatch, useAppSelector } from "../../../../redux/store";
import { ButtonStyled } from "../../../../ui/ButtonStyled";
import { InputStyled } from "../../../../ui/InputStyled";
import { IFormEdit } from "../FormEditRecord/FormEditRecord";

export function FormEditRecordForwarder({ setModalActiveEdit, id }: IFormEdit) {
  const dispatch = useAppDispatch();
  const [record, setRecord] = useState<ISettingsForwarder>(
    initialSettingsForwarder
  );
  const { emptyField } = useValidate();
  const recordById = useAppSelector((state) =>
    state.settings.statusSettings.allSettings.settingsForwarder.find(
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
      if (emptyField(record.forwarder, 'Поле ввода "Фамилия И.О."')) return;
      if (emptyField(record.birth, 'Поле ввода "Дата рождения"')) return;
      if (emptyField(record.carNumber, 'Поле ввода "Гос.номер авто"')) return;
      if (emptyField(record.carBrand, 'Поле ввода "Марка авто"')) return;

      dispatch(updateForwarder({ record }));
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
          value={record.forwarder}
          colorFocus="sky"
          type="text"
          placeholder="Товар"
          name="forwarder"
          onChange={changeHandler}
          className="my-2"
        />
        <InputStyled
          value={record.birth}
          colorFocus="sky"
          type="text"
          placeholder="Единица измерения"
          name="birth"
          onChange={changeHandler}
          className="my-2"
        />
        <InputStyled
          value={record.carNumber}
          colorFocus="sky"
          type="text"
          placeholder="Единица измерения"
          name="carNumber"
          onChange={changeHandler}
          className="my-2"
        />
        <InputStyled
          value={record.carBrand}
          colorFocus="sky"
          type="text"
          placeholder="Единица измерения"
          name="carBrand"
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
