import React, { useEffect, useState } from "react";
import {
  createRecord,
  dataRecords,
  IStoreListRecords,
} from "../../../../redux/features/recordSlice";
import { useAppDispatch, useAppSelector } from "../../../../redux/store";
import { ButtonStyled } from "../../../../ui/ButtonStyled";
import { InputStyled } from "../../../../ui/InputStyled";
import { LabelStyled } from "../../../../ui/LabelStyled";
import { IList, Select } from "../../../../ui/Select";

export function FormAddRecord() {
  const [record, setRecord] = useState({});
  //стейт под select
  const [selectFrom, setSelectFrom] = useState({});
  const [selectTo, setSelectTo] = useState({});

  const [selectProduct, setSelectProduct] = useState({});

  const [selectForwarder, setSelectForwarder] = useState({});

  const [listFromTo, setListFromTo] = useState<IList[]>();
  const [listFromProduct, setListProduct] = useState<IList[]>();
  const [listFromForwarder, setListForwarder] = useState<IList[]>();

  //запись всех полей в объект
  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRecord({ ...record, [event.target.name]: event.target.value });
  };
  const {
    statusRecords: { loading },
  }: IStoreListRecords = useAppSelector(dataRecords);
  const dispatch = useAppDispatch();
  //добавляем запись
  const addRecordHandler = async () => {
    const newRecord = {
      ...record,
      ...selectFrom,
      ...selectTo,
      ...selectProduct,
      ...selectForwarder,
    };
    console.log(newRecord, selectFrom);
    // dispatch(createRecord({ newRecord }));
  };

  const organization = useAppSelector(
    (state) => state.settings.statusSettings.allSettings.settingsOrganization
  );
  const product = useAppSelector(
    (state) => state.settings.statusSettings.allSettings.settingsProduct
  );
  const forwarder = useAppSelector(
    (state) => state.settings.statusSettings.allSettings.settingsForwarder
  );

  useEffect(() => {
    setListFromTo(
      organization.map((record) => {
        return {
          id: record._id,
          name: record.name,
        };
      })
    );
    setListProduct(
      product.map((record) => {
        return {
          id: record._id,
          name: record.product,
        };
      })
    );
    setListForwarder(
      forwarder.map((record) => {
        return {
          id: record._id,
          name: record.forwarder,
        };
      })
    );
  }, [forwarder, organization, product]);

  return (
    <>
      <h3 className="text-2xl mb-5 ">Добавить запись:</h3>
      <div className="form-group mb-6 flex flex-wrap">
        <div className="w-full md:w-[25%] lg:w-[20%] xl:w-[13%]  px-3 mb-6 md:mb-0">
          <LabelStyled title="Отправитель" forId="recordFrom" />
          <Select
            list={listFromTo}
            updateSelect={setSelectFrom}
            nameSelect="from"
            id="recordFrom"
            title="Откуда?"
          />
        </div>
        <div className="w-full md:w-[25%] lg:w-[20%] xl:w-[13%] px-3 mb-6 md:mb-0">
          <LabelStyled title="Получатель" forId="recordTo" />
          <Select
            list={listFromTo}
            updateSelect={setSelectTo}
            nameSelect="to"
            id="recordFrom"
            title="Куда?"
          />
        </div>
        <div className="w-full md:w-[25%] lg:w-[20%] xl:w-[13%] px-3 mb-6 md:mb-0">
          <LabelStyled title="Расстояние, км" forId="recordDistance" />
          <InputStyled
            colorFocus="sky"
            type="text"
            placeholder="км"
            name="distance"
            onChange={changeHandler}
            id="recordDistance"
          />
        </div>
        <div className="w-full md:w-[25%] lg:w-[20%] xl:w-[13%] px-3 mb-6 md:mb-0">
          <LabelStyled title="Товар" forId="recordProduct" />
          <Select
            list={listFromProduct}
            updateSelect={setSelectProduct}
            nameSelect="product"
            id="recordProduct"
            title="Что везем?"
          />
        </div>
        <div className="w-full md:w-[25%] lg:w-[20%] xl:w-[13%] px-3 mb-6 md:mb-0">
          <LabelStyled title="Количество" forId="recordUnits" />
          <InputStyled
            colorFocus="sky"
            type="text"
            placeholder="Укажите число"
            name="units"
            onChange={changeHandler}
            id="recordUnits"
          />
        </div>
        <div className="w-full md:w-[25%] lg:w-[20%] xl:w-[13%] px-3 mb-6 md:mb-0">
          <LabelStyled title="Ответственный" forId="recordForwarder" />
          <Select
            list={listFromForwarder}
            updateSelect={setSelectForwarder}
            nameSelect="forwarder"
            id="recordForwarder"
            title="Кто везет?"
          />
        </div>
        <div className="w-full md:w-[25%] lg:w-[20%] xl:w-[13%] px-3 mb-6 md:mb-0">
          <LabelStyled title="Цена" forId="recordPrice" />
          <InputStyled
            colorFocus="sky"
            type="text"
            placeholder="За единицу"
            name="price"
            onChange={changeHandler}
            id="recordPrice"
          />
        </div>
        <div className="w-full sm:w-full sm:pt-2 md:pt-0 md:w-1/12 lg:w-1/12 lg:pt-0 px-3 mb-6 md:mb-0 md:relative">
          <ButtonStyled
            title="Добавить"
            variant="sky"
            type="button"
            disabled={loading}
            onClick={addRecordHandler}
            className="md:absolute md:bottom-0"
          />
        </div>
      </div>
    </>
  );
}
