import React, { useEffect, useState } from "react";
import { IRecord } from "../../models/Record";
import { getSumArrivalProduct, getSumShipProduct } from "../../redux/api";
import { useAppSelector } from "../../redux/store";
import { ButtonStyled } from "../../ui/ButtonStyled";
import { IList, Select } from "../../ui/Select";
import { SummarySenderRecipient } from "./SummarySenderRecipient";

interface ISelectOrganization {
  organization_id?: string;
}

interface ISumAggregation {
  isFill: boolean;
  totalUnits?: number;
  totalSum?: number;
}

export function StatisticsPage() {
  //стейт куда попадает выбранная пользователем организация
  const [selectOrganization, setSelectOrganization] = useState({});
  //стейт для хранения списка организаций из редакс
  const [listOrganization, setListOrganization] = useState<IList[]>();

  const [maxPriceRecord, setMaxPriceRecord] = useState<IRecord>();
  const [minPriceRecord, setMinPriceRecord] = useState<IRecord>();
  const [avgPriceState, setAvgPriceState] = useState<number>();

  const [agrFromOrg, setAgrFromOrg] = useState<ISumAggregation>();
  const [agrToOrg, setAgrToOrg] = useState<ISumAggregation>();
  //получаем организации
  const organization = useAppSelector(
    (state) => state.settings.statusSettings.allSettings.settingsOrganization
  );

  const token = useAppSelector((state) => state.auth.statusUser.user.token);
  const listRecord = useAppSelector(
    (state) => state.records.statusRecords.listRecords
  );

  useEffect(() => {
    setListOrganization(
      organization.map((record) => {
        return {
          id: record._id,
          name: record.name,
        };
      })
    );

    setAvgPriceState(
      listRecord.reduce((acc, cur) => acc + cur.price, 0) / listRecord.length
    );
    setMinPriceRecord(
      listRecord.reduce(function (res, obj) {
        return obj.price < res.price ? obj : res;
      })
    );
    setMaxPriceRecord(
      listRecord.reduce(function (res, obj) {
        return obj.price > res.price ? obj : res;
      })
    );
  }, [listRecord, organization]);

  //обработик кнопки
  const selectHandler = async () => {
    const { organization_id }: ISelectOrganization = selectOrganization;
    if (organization_id) {
      const resShip = await getSumShipProduct(organization_id, token);
      const resArrival = await getSumArrivalProduct(organization_id, token);

      setAgrFromOrg(resShip.data.objAnswer);
      setAgrToOrg(resArrival.data.objAnswer);
    }
  };

  return (
    <>
      <h3 className="text-2xl mb-5 ">
        Выборочная статистика по данным из списка записей
      </h3>
      <hr />
      <div className="form-group mb-6 mt-2 flex flex-wrap">
        <div className="w-full mb-2">
          Самый дорогой товар за единицу: {maxPriceRecord?.product_id}, цена{" "}
          {maxPriceRecord?.price} рублей
        </div>
        <div className="w-full mb-2">
          Самый дешевый товар за единицу: {minPriceRecord?.product_id}, цена{" "}
          {minPriceRecord?.price} рублей
        </div>
        <div className="w-full mb-2">
          Средняя цена всех товаров: {avgPriceState} рублей
        </div>
        <hr className="w-full mb-2" />
        <div className="w-full form-group flex flex-wrap mb-2">
          <span className="self-center text-lg font-semibold">
            Краткая сводка по организации
          </span>
          <div className="w-full md:w-[25%] lg:w-[20%] xl:w-[13%]  px-3 mb-6 md:mb-0">
            <Select
              list={listOrganization}
              updateSelect={setSelectOrganization}
              nameSelect="organization"
              id="organization"
              title="Выбрать"
            />
          </div>
          <div className="w-full sm:w-full sm:pt-2 md:pt-0 md:w-1/12 lg:w-1/12 lg:pt-0 px-3 mb-6 md:mb-0 md:relative">
            <ButtonStyled
              title="Показать"
              variant="sky"
              type="button"
              disabled={false}
              onClick={selectHandler}
              className="md:absolute md:bottom-0"
            />
          </div>
        </div>
        {agrFromOrg?.isFill && (
          <div className="w-full mb-2">
            Отгруженно всего: {agrFromOrg?.totalUnits} единиц товара, на общую
            сумму: {agrFromOrg?.totalSum} рублей
          </div>
        )}
        {agrToOrg?.isFill && (
          <div className="w-full mb-2">
            Полученно всего: {agrToOrg?.totalUnits} единиц товара, на общую
            сумму: {agrToOrg?.totalSum} рублей
          </div>
        )}
        <SummarySenderRecipient listOrganization={listOrganization} />

        {/* TODO:Заняться как появиться время */}

        {/* <hr className="w-full mb-2" />
        <div className="w-full form-group flex flex-wrap mb-2">
          <span className="self-center text-lg font-semibold">
            Подробная сводка
          </span>
          Селект: Отгрузка/Приход
          <br />
          Селект: Все товары/Конкретный <br />
          Селект: Все организации/Конкретная <br />
          Инпут начальной даты: Дата первой записи/Конкретная дата дд/мм/гггг
          <br />
          Инпут конечной даты: Текущая дата/Конкретная дата дд/мм/гггг
          <br />
          Формируем ответ цены товара(средняя если все/либо конкретная),
          название товара(либо просто все), всего отгружено/полученно на общую
          сумму за указанный период для выбранной организации(или всех),
        </div> */}
      </div>
    </>
  );
}
