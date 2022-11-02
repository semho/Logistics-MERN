import React, { useEffect, useState } from "react";
import {
  getSumArrivalProduct,
  getSumShipProduct,
  maxPrice,
  minPrice,
} from "../../redux/api";
import { useAppSelector } from "../../redux/store";
import { ButtonStyled } from "../../ui/ButtonStyled";
import { IList, Select } from "../../ui/Select";

interface ISelectOrganization {
  organization_id?: string;
}

interface ISumAggregation {
  isFill: boolean;
  totalUnits?: number;
  totalSum?: number;
}

interface IPriceProduct {
  price: number;
  productName: string;
}

export function StatisticsPage() {
  //стейт куда попадает выбранная пользователем организация
  const [selectOrganization, setSelectOrganization] = useState({});
  //стейт для хранения списка организаций из редакс
  const [listOrganization, setListOrganization] = useState<IList[]>();

  const [maxPriceState, setMaxPriceState] = useState<IPriceProduct>();
  const [minPriceState, setMinPriceState] = useState<IPriceProduct>();

  const [agrFromOrg, setAgrFromOrg] = useState<ISumAggregation>();
  const [agrToOrg, setAgrToOrg] = useState<ISumAggregation>();
  //получаем организации
  const organization = useAppSelector(
    (state) => state.settings.statusSettings.allSettings.settingsOrganization
  );

  const token = useAppSelector((state) => state.auth.statusUser.user.token);

  useEffect(() => {
    setListOrganization(
      organization.map((record) => {
        return {
          id: record._id,
          name: record.name,
        };
      })
    );
    const fetchData = async () => {
      const maxPriceProduct = await maxPrice(token);
      const minPriceProduct = await minPrice(token);
      setMaxPriceState(maxPriceProduct.data);
      setMinPriceState(minPriceProduct.data);
    };

    fetchData();
  }, [organization, token]);

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
          Самый дорогой товар за единицу: {maxPriceState?.productName}, цена{" "}
          {maxPriceState?.price} рублей
        </div>
        <div className="w-full mb-2">
          Самый дешевый товар за единицу: {minPriceState?.productName}, цена{" "}
          {minPriceState?.price} рублей
        </div>
        <span className="self-center">Краткая сводка по организации</span>
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
            title="Добавить"
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
          Полученно всего: {agrToOrg?.totalUnits} единиц товара, на общую сумму:{" "}
          {agrToOrg?.totalSum} рублей
        </div>
      )}
      Самый дорогой товар за единицу
      <br />
      Самый дешевый товар за единицу
      <br />
      Средняя стоимость единицы товара на отгрузке
      <br />
      Средняя стоимость единицы товара при получении
      <br />
      Общая стоимость отгруженных товаров(всех или опредленный) с указанием их
      количества за определенный срок(или за все время)
      <br />
      Первый селект содержит: По дефолту все товары, либо выбрать конкретный
      <br />
      Второй селект содержит: Нужно выбрать конкретную организацию
      <br />
      Третий селект: По дефолту первая дата записей, либо конкретная начальня
      дата по определенной маске типа дд/мм/гггг <br />
      Четвертый селект: По дефолту текущая дата, либо конкретная конечная дата
      по определенной маске типа дд/мм/гггг
      <br />
      <br />
      <br />
      Все тоже самое, но теперь общая стоимость принятого товара
    </>
  );
}
