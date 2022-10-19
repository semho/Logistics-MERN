import React, { useEffect, useState } from "react";
import { useValidate } from "../../../../hooks/useValidate";
import {
  initialSettingsOrganization,
  ISettingsOrganization,
} from "../../../../models/settings/Organization";
import { updateOrganization } from "../../../../redux/features/settingsSlice";
import { useAppDispatch, useAppSelector } from "../../../../redux/store";
import { ButtonStyled } from "../../../../ui/ButtonStyled";
import { InputStyled } from "../../../../ui/InputStyled";
import { LabelStyled } from "../../../../ui/LabelStyled";
import { IFormEdit } from "../FormEditRecord/FormEditRecord";

export function FormEditRecordOrganization({
  setModalActiveEdit,
  id,
}: IFormEdit) {
  const dispatch = useAppDispatch();
  const [record, setRecord] = useState<ISettingsOrganization>(
    initialSettingsOrganization
  );
  const { emptyField, mask, limitNumberCharacters, zeroField, checkingLength } =
    useValidate();
  const recordById = useAppSelector((state) =>
    state.settings.statusSettings.allSettings.settingsOrganization.find(
      (record) => record._id === id
    )
  );

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (record) {
      mask("phone", event);
      limitNumberCharacters("INN", 12, event);
      limitNumberCharacters("KPP", 9, event);
      limitNumberCharacters("OGRN", 15, event);
      limitNumberCharacters("paymentAccount", 20, event);
      limitNumberCharacters("corAccount", 20, event);
      limitNumberCharacters("BIC", 9, event);
      setRecord({
        ...record,
        [event.target.name]: event.target.value,
      });
    }
  };

  //редактирование записи
  const editRecordHandler = async () => {
    if (id && record) {
      if (zeroField(record.INN, 'Поле ввода "ИНН"')) return;
      if (checkingLength(String(record.INN), "ИНН", 10)) return;
      if (emptyField(record.name, 'Поле ввода "Название организации"')) return;
      if (emptyField(record.phone, 'Поле ввода "Телефон"')) return;
      if (checkingLength(record.phone, "Телефон", 14)) return;
      if (emptyField(record.address, 'Поле ввода "Адрес"')) return;

      dispatch(updateOrganization({ record }));
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
      <div className="mt-[80vw] sm:mt-[60vw] md:mt-0">
        <div className="container-fluid md:w-[50vw] md:flex md:flex-wrap md:justify-between">
          <div className="md:w-[22vw]">
            <h4 className="text-xl mb-3">Общие данные организации</h4>
            <LabelStyled title="ИНН" forId="innUpdate" />
            <InputStyled
              value={record.INN}
              colorFocus="sky"
              type="text"
              placeholder="ИНН"
              name="INN"
              onChange={changeHandler}
              className="my-2"
              id="innUpdate"
            />
            <LabelStyled title="Название огранизации" forId="nameUpdate" />
            <InputStyled
              value={record.name}
              colorFocus="sky"
              type="text"
              placeholder="Название"
              name="name"
              onChange={changeHandler}
              className="my-2"
              id="nameUpdate"
            />
            <LabelStyled title="Телефон огранизации" forId="phoneUpdate" />
            <InputStyled
              value={record.phone}
              colorFocus="sky"
              type="text"
              placeholder="(911) 111 1111"
              name="phone"
              onChange={changeHandler}
              className="my-2"
              id="phoneUpdate"
            />
            <LabelStyled title="Адрес огранизации" forId="addressUpdate" />
            <InputStyled
              value={record.address}
              colorFocus="sky"
              type="text"
              placeholder="Адрес"
              name="address"
              onChange={changeHandler}
              className="my-2"
              id="addressUpdate"
            />
            <LabelStyled title="Email огранизации" forId="emailUpdate" />
            <InputStyled
              value={record.email}
              colorFocus="sky"
              type="text"
              placeholder="E-mail"
              name="email"
              onChange={changeHandler}
              className="my-2"
              id="emailUpdate"
            />
            <LabelStyled
              title="Координаты огранизации"
              forId="coordinatesUpdate"
            />
            <InputStyled
              value={record.coordinates}
              colorFocus="sky"
              type="text"
              placeholder="Координаты"
              name="coordinates"
              onChange={changeHandler}
              className="my-2"
              id="coordinatesUpdate"
            />
          </div>

          <div className="md:w-[22vw]">
            <h4 className="text-xl mb-3">Банковские реквизиты</h4>
            <LabelStyled title="Название банка" forId="bankUpdate" />
            <InputStyled
              value={record.bank}
              colorFocus="sky"
              type="text"
              placeholder="Банк"
              name="bank"
              onChange={changeHandler}
              className="my-2"
              id="bankUpdate"
            />
            <LabelStyled title="КПП" forId="KPPUpdate" />
            <InputStyled
              value={record.KPP}
              colorFocus="sky"
              type="text"
              placeholder="КПП"
              name="KPP"
              onChange={changeHandler}
              className="my-2"
              id="KPPUpdate"
            />
            <LabelStyled title="ОГРН" forId="OGRNUpdate" />
            <InputStyled
              value={record.OGRN}
              colorFocus="sky"
              type="text"
              placeholder="ОГРН"
              name="OGRN"
              onChange={changeHandler}
              className="my-2"
              id="OGRNUpdate"
            />
            <LabelStyled title="Расчетный счет" forId="payAccUpdate" />
            <InputStyled
              value={record.paymentAccount}
              colorFocus="sky"
              type="text"
              placeholder="Расчетный счет"
              name="paymentAccount"
              onChange={changeHandler}
              className="my-2"
              id="payAccUpdate"
            />
            <LabelStyled title="Кор.счет" forId="corAccUpdate" />
            <InputStyled
              value={record.corAccount}
              colorFocus="sky"
              type="text"
              placeholder="Кор.счет"
              name="corAccount"
              onChange={changeHandler}
              className="my-2"
              id="corAccUpdate"
            />
            <LabelStyled title="БИК банка" forId="BIC" />
            <InputStyled
              value={record.BIC}
              colorFocus="sky"
              type="text"
              placeholder="БИК"
              name="BIC"
              onChange={changeHandler}
              className="my-2"
              id="BIC"
            />
          </div>
        </div>

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
