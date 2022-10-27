import React, { useEffect, useState } from "react";
import { useAppSelector } from "../../redux/store";
import { ButtonStyled } from "../../ui/ButtonStyled";
import { IList, Select } from "../../ui/Select";

export function StatisticsPage() {
  //стейт куда попадает выбранная пользователем организация
  const [selectOrganization, setSelectOrganization] = useState({});
  //стейт для хранения списка организаций из редакс
  const [listOrganization, setListOrganization] = useState<IList[]>();
  //получаем организации
  const organization = useAppSelector(
    (state) => state.settings.statusSettings.allSettings.settingsOrganization
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
  }, [organization]);

  //обработик кнопки
  const selectHandler = async () => {
    console.log(selectOrganization);

    // dispatch(getRecord({ selectOrganization }));
  };

  return (
    <>
      <h3 className="text-2xl mb-5 ">
        Выборочная статистика по данным из списка записей
      </h3>
      <hr />
      <div className="form-group mb-6 mt-2 flex flex-wrap">
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
      Краткая сводка по организации: Селект выбрать организацию, получаем
      данные.
      <br />
      Отгруженно товаров всего на общую сумму и количество за все время
      <br />
      Полученно товаров всего на общую сумму и количестово за все время
      <br />
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
