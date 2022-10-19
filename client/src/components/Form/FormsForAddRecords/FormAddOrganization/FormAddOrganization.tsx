import React, { useState } from "react";
import { useValidate } from "../../../../hooks/useValidate";
import { initialSettingsOrganizationShort } from "../../../../models/settings/Organization";
import { createOrganization } from "../../../../redux/features/settingsSlice";
import { useAppDispatch, useAppSelector } from "../../../../redux/store";
import { ButtonStyled } from "../../../../ui/ButtonStyled";
import { InputStyled } from "../../../../ui/InputStyled";

export function FormAddOrganization() {
  const { emptyField, zeroField, matchEmail, limitNumberCharacters, mask } =
    useValidate();
  const [record, setRecord] = useState(initialSettingsOrganizationShort);
  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    mask("phone", event);
    limitNumberCharacters("INN", 12, event);
    limitNumberCharacters("KPP", 9, event);
    limitNumberCharacters("OGRN", 15, event);
    limitNumberCharacters("paymentAccount", 20, event);
    limitNumberCharacters("corAccount", 20, event);
    limitNumberCharacters("BIC", 9, event);
    setRecord({ ...record, [event.target.name]: event.target.value });
  };
  const loading = useAppSelector(
    (state) => state.settings.statusSettings.loading
  );
  const dispatch = useAppDispatch();
  const addRecordSettingsHandler = async () => {
    const newRecord = { ...record };
    if (zeroField(record.INN, 'Поле ввода "ИНН"')) return;
    if (emptyField(record.name, 'Поле ввода "Название организации"')) return;
    if (emptyField(record.phone, 'Поле ввода "Телефон"')) return;
    if (emptyField(record.address, 'Поле ввода "Адрес"')) return;
    if (record.email !== "") {
      if (matchEmail(record.email)) return;
    }

    dispatch(createOrganization({ newRecord }));
  };
  return (
    <>
      <h3 className="text-2xl mb-5 mt-5">Форма добавления организации в БД</h3>

      <div className="form-group mb-6 flex flex-wrap justify-center flex-col">
        <hr />
        <h4 className="text-xl mb-3">Общие данные организации</h4>
        <div className="form-group flex flex-wrap justify-center">
          <div className="w-full md:w-1/6 px-3 mb-6 md:mb-0">
            <InputStyled
              colorFocus="sky"
              type="text"
              placeholder="ИНН"
              name="INN"
              onChange={changeHandler}
            />
          </div>
          <div className="w-full md:w-1/6 px-3 mb-6 md:mb-0">
            <InputStyled
              colorFocus="sky"
              type="text"
              placeholder="Название"
              name="name"
              onChange={changeHandler}
            />
          </div>
          <div className="w-full md:w-1/6 px-3 mb-6 md:mb-0">
            <InputStyled
              colorFocus="sky"
              type="text"
              placeholder="(911) 111 1111"
              name="phone"
              onChange={changeHandler}
            />
          </div>
          <div className="w-full md:w-1/6 px-3 mb-6 md:mb-0">
            <InputStyled
              colorFocus="sky"
              type="text"
              placeholder="Адрес"
              name="address"
              onChange={changeHandler}
            />
          </div>
          <div className="w-full md:w-1/6 px-3 mb-6 md:mb-0">
            <InputStyled
              colorFocus="sky"
              type="text"
              placeholder="E-mail"
              name="email"
              onChange={changeHandler}
            />
          </div>
          <div className="w-full md:w-1/6 px-3 mb-6 md:mb-0">
            <InputStyled
              colorFocus="sky"
              type="text"
              placeholder="Координаты"
              name="coordinates"
              onChange={changeHandler}
            />
          </div>
        </div>
        <hr className="mt-5" />
        <h4 className="text-xl mb-3">Банковские реквизиты</h4>
        <div className="form-group flex flex-wrap justify-center">
          <div className="w-full md:w-1/6 px-3 mb-6 md:mb-0">
            <InputStyled
              colorFocus="sky"
              type="text"
              placeholder="Банк"
              name="bank"
              onChange={changeHandler}
            />
          </div>
          <div className="w-full md:w-1/6 px-3 mb-6 md:mb-0">
            <InputStyled
              colorFocus="sky"
              type="text"
              placeholder="КПП"
              name="KPP"
              onChange={changeHandler}
            />
          </div>
          <div className="w-full md:w-1/6 px-3 mb-6 md:mb-0">
            <InputStyled
              colorFocus="sky"
              type="text"
              placeholder="ОГРН"
              name="OGRN"
              onChange={changeHandler}
            />
          </div>
          <div className="w-full md:w-1/6 px-3 mb-6 md:mb-0">
            <InputStyled
              colorFocus="sky"
              type="text"
              placeholder="Расчетный счет"
              name="paymentAccount"
              onChange={changeHandler}
            />
          </div>
          <div className="w-full md:w-1/6 px-3 mb-6 md:mb-0">
            <InputStyled
              colorFocus="sky"
              type="text"
              placeholder="Кор.счет"
              name="corAccount"
              onChange={changeHandler}
            />
          </div>
          <div className="w-full md:w-1/6 px-3 mb-6 md:mb-0">
            <InputStyled
              colorFocus="sky"
              type="text"
              placeholder="БИК"
              name="BIC"
              onChange={changeHandler}
            />
          </div>
        </div>
        <hr className="mt-5 mb-3" />
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
